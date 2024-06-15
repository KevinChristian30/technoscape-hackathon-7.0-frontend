"use client";

import RecepientChatBubble from "@/components/chat/RecepientChatBubble";
import SenderChatBubble from "@/components/chat/SenderChatBubble";
import MHDError from "@/components/domain/MHDError";
import { Button } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";
import { toast } from "@/components/ui/hooks/useToast";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCreateAgentAIChatRoom } from "@/composables/ai/mutation/useCreateAgentAIChatRoom";
import { useAgentAIChat } from "@/composables/ai/query/useAgentAIChat";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import { CustomerAIChatResponse } from "@/services/ai/ai.chat";
import { CreateAgentAIChatRoomResponse } from "@/services/ai/createAgentAIChatRoom.post";
import { ArrowRightToLine } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

enum Sender {
  ME = "You",
  AI = "AI",
}

interface AgentAIChatResponseWithDummmySender extends CustomerAIChatResponse {
  sender: Sender;
}

interface Props {
  className?: string;
}

const MHDAgentAIChatbox = ({ className }: Props) => {
  const { id } = useUser();
  const { data, mutate, status, error } = useCreateAgentAIChatRoom();
  const {
    data: chatResponse,
    mutate: sendChat,
    status: sendChatStatus,
    error: sendChatError,
  } = useAgentAIChat();

  const [roomData, setRoomData] =
    useState<CreateAgentAIChatRoomResponse | null>(null);
  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<AgentAIChatResponseWithDummmySender[]>(
    []
  );

  const scrollRef = useRef<any>(null);

  const handleReceiveChat = useCallback(
    (data: AgentAIChatResponseWithDummmySender) => {
      setHistory((prevHistory) => [...prevHistory, data]);
    },
    []
  );

  useEffect(() => {
    mutate({ agentId: id });
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
    }
  }, [status, data]);

  useEffect(() => {
    if (sendChatStatus === "error") {
      toast({
        title: "Something went wrong",
        description:
          sendChatError.response?.data.errors[0] ?? "Failed sending query",
        variant: "destructive",
      });
    } else if (sendChatStatus === "success" && chatResponse) {
      handleReceiveChat({ data: chatResponse.data, sender: Sender.AI });
    }
  }, [sendChatStatus, data, chatResponse]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.lastElementChild.scrollTop =
        scrollRef.current.lastElementChild.scrollHeight + 1000;
    }
  }, [history]);

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

    handleReceiveChat({ data: { message: message }, sender: Sender.ME });
    sendChat({
      agentId: roomData!.data.agentId,
      message: message,
      roomId: roomData!.data.roomId,
    });
    setMessage("");
  };

  if (status === "pending") {
    return <Skeleton className="w-full h-96"></Skeleton>;
  }

  if (status === "error") {
    return <MHDError />;
  }

  return (
    <div className={cn("grid place-items-center", className)}>
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
              isLoading={sendChatStatus === "pending"}
            >
              Send <ArrowRightToLine className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MHDAgentAIChatbox;
