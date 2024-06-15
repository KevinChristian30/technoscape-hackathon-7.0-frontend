"use client";

import RecepientChatBubble from "@/components/chat/RecepientChatBubble";
import SenderChatBubble from "@/components/chat/SenderChatBubble";
import MHDForm from "@/components/domain/MHDFom";
import MHDTextField from "@/components/domain/MHDTextField";
import { Button } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { toast } from "@/components/ui/hooks/useToast";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useCreateCustomerAIChatRoom } from "@/composables/ai/mutation/useCreateCustomerAIChatRoom";
import { useCustomerAIChat } from "@/composables/ai/query/useCustomerAIChat";
import { CustomerAIChatResponse } from "@/services/ai/ai.chat";
import { CreateCustomerAIChatRoomResponse } from "@/services/ai/createCustomerAIChatRoom.post";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightToLine } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum Sender {
  ME,
  AI,
}

interface CustomerAIChatResponseWithDummmySender
  extends CustomerAIChatResponse {
  sender: Sender;
}

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { data, mutate, status, error } = useCreateCustomerAIChatRoom();
  const {
    data: chatResponse,
    mutate: sendChat,
    status: sendChatStatus,
  } = useCustomerAIChat();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [roomData, setRoomData] =
    useState<CreateCustomerAIChatRoomResponse | null>(null);
  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<
    CustomerAIChatResponseWithDummmySender[]
  >([]);

  const scrollRef = useRef<any>(null);

  const handleReceiveChat = useCallback(
    (data: CustomerAIChatResponseWithDummmySender) => {
      setHistory((prevHistory) => [...prevHistory, data]);
    },
    []
  );

  useEffect(() => {
    setDialogOpen(true);
  }, []);

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Something went wrong",
        description:
          error.response?.data.errors[0] ?? "Failed creating chat room",
        variant: "destructive",
      });
    } else if (status === "success") {
      toast({
        title: "Success",
        description: "Room created successfully",
        variant: "success",
      });

      setRoomData(data);
      setDialogOpen(false);
    }
  }, [status, data]);

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Something went wrong",
        description: error.response?.data.errors[0] ?? "Failed sending query",
        variant: "destructive",
      });
    } else if (status === "success" && chatResponse) {
      handleReceiveChat({ data: { message: message }, sender: Sender.ME });
      handleReceiveChat({ data: chatResponse?.data, sender: Sender.AI });
    }
  }, [sendChatStatus, data, chatResponse]);

  function onUserDataSent(values: z.infer<typeof formSchema>) {
    mutate({
      customerEmail: values.email,
      customerName: values.name,
    });
  }

  const onChatSent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message === "") {
      toast({
        title: "Empty Message",
        description: "Please type a message",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    sendChat({
      customerName: roomData!.data.customerName,
      message: message,
      roomId: roomData!.data.roomId,
    });
    setMessage("");
  };

  return (
    <div className="w-screen h-screen grid place-items-center">
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Chatting</DialogTitle>
            <DialogDescription>
              Enter your data and out bot will assist you.
            </DialogDescription>

            <div className="h-4"></div>

            <MHDForm
              form={form}
              className="space-y-4 mx-auto grid w-full gap-6"
              onFormSubmit={onUserDataSent}
            >
              <MHDTextField
                control={form.control}
                name="name"
                label="Name"
                placeHolder="Jon Doe"
              />

              <MHDTextField
                control={form.control}
                name="email"
                label="Email"
                placeHolder="jon.doe@gmail.com"
                type="email"
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={status === "pending"}
              >
                Start Chatting
              </Button>
            </MHDForm>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="flex flex-col gap-2 justify-content w-full max-w-[800px]">
        <ScrollArea
          className="h-[34rem] w-full rounded-md border p-6 flex flex-col-reverse"
          ref={scrollRef}
        >
          {history.map((chat, index) => {
            if (chat.sender === Sender.ME) {
              return (
                <SenderChatBubble
                  key={index}
                  name={chat.sender.toString()}
                  time={""}
                  message={chat.data.message}
                />
              );
            } else {
              return (
                <RecepientChatBubble
                  key={index}
                  name={chat.sender.toString()}
                  time={""}
                  message={chat.data.message}
                />
              );
            }
          })}
        </ScrollArea>

        <CardFooter className="w-full flex item-center py-4">
          <form
            className="w-full flex flex-row justify-between gap-4"
            onSubmit={onChatSent}
          >
            <Input
              type="text"
              placeholder="Ask me anything"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              size="sm"
              variant="default"
              className="gap-1 dark:text-white"
            >
              Send <ArrowRightToLine className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
