"use client"
import {
  ArrowRightToLine,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardFooter,
} from "@/components/ui/Card";

import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import ProfileInformation from "@/components/chat/ProfileInformation";
import RecepientChatBubble from "@/components/chat/RecepientChatBubble";
import SenderChatBubble from "@/components/chat/SenderChatBubble";
import ChatBot from "@/components/chat/ChatBot";
import { useCallback, useEffect, useRef, useState } from "react";
import useSocket from "@/socket/useSocket";
import { useUser } from "@/providers/UserProvider";
import { toast } from "@/components/ui/hooks/useToast";
import { ScrollArea } from "@/components/ui/ScrollArea";
import FinishedChatButton from "@/components/ui/FinishChatButton";
import http from "@/lib/axios";
import { useRouter } from "next/navigation";

interface CustomerAgentChatDto {
  roomId: string
  message: string
  name: string | null
  userId: string | null
  createdAt: Date
}

interface PageProps {
  params: {
    roomId: string;
  }
}

function Page({ params }: PageProps) {

  const serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<CustomerAgentChatDto[]>([]);

  const { id, name } = useUser();
  const router = useRouter();


  const { roomId } = params;
  const socket = useSocket({ serverUrl });

  const scrollRef = useRef<any>(null);

  const [flag, setFlag] = useState(false)

  const handleReceiveChat = useCallback((data: CustomerAgentChatDto) => {
    setHistory((prevHistory) => [...prevHistory, data]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.lastElementChild.scrollTop = scrollRef.current.lastElementChild.scrollHeight + 1000;
    }
  }, [history])

  useEffect(() => {
    if (socket) {
      setFlag(true);
      socket.on('receive-chat', handleReceiveChat);
      return () => {
        toast({
          title: "Disconnected From Chat",
          description: "Something went wrong",
          variant: "destructive",
          duration: 1500,
        });
        socket.off('receive-chat', handleReceiveChat);
        socket.off('disconnect');
        socket.disconnect();
      };
    }
  }, [socket, handleReceiveChat]);

  //once
  useEffect(() => {
    {
      if (socket) {
        const res = {
          roomId: roomId,
          agentName: name
        }


        socket.emit('join-room-agent', res)
        toast({
          title: "Connected",
          description: "You are now connected to the chat",
          variant: "success",
          duration: 1500,
        });
        console.log("Connected");
      }
    }
  }, [flag])


  const handleSendData = () => {
    if (socket) {

      const payload = {
        roomId: roomId,
        message: message,
        name: null,
        userId: id,
      }


      socket.emit('send-chat', payload);
    }

  };


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    handleSendData();
    setMessage("");
  }

  function handleClick() {


    const res = {
      customerAgentRoomId: roomId,
    }
    http.put(`rooms/customer-agent/accept`, res)
    router.push(`/customer-chats`);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 bg-muted/30 p-2 rounded-lg overflow-y-clip">
      <div className="grid items-start gap-4 lg:col-span-2 lg:gap-3">
        <Card className="flex justify-between w-full p-5">
          <div className="flex flex-col gap-2">
            <div className="font-lg">Customer Chat</div>
            <Separator />
          </div>
          <FinishedChatButton onclick={handleClick} />
        </Card>
        <Card x-chunk="Page-07-chunk-1" className="flex flex-col gap-2 justify-content-around">
          {/* Chat Box Container */}

          <ScrollArea className="h-[34rem] w-full rounded-md border p-6 flex flex-col-reverse" ref={scrollRef} >
            {history.map((chat, index) => {
              if (chat.userId === id) {
                return <SenderChatBubble key={index} name={name} time={chat.createdAt.toString()} message={chat.message} />
              } else {
                return <RecepientChatBubble key={index} name={chat.name} time={chat.createdAt.toString()} message={chat.message} />
              }
            })}

          </ScrollArea>
          <CardFooter className="w-full flex item-center py-4">
            <form className="w-full flex flex-row justify-between gap-4" onSubmit={onSubmit}>
              <Input type="text" placeholder="Please Reply To Customer" value={message} onChange={(e) => setMessage(e.target.value)} />
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
      <ChatBot />
    </div>



  );
}

export default Page;
