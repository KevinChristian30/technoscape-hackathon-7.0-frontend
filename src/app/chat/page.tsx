"use client"
import {
    ArrowRightToLine, Circle, LoaderCircle,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardFooter,
} from "@/components/ui/Card";

import { Input } from "@/components/ui/Input";
import ProfileInformation from "@/components/chat/ProfileInformation";
import RecepientChatBubble from "@/components/chat/RecepientChatBubble";
import { useCallback, useEffect, useRef, useState } from "react";
import useSocket from "@/socket/useSocket";
import { useUser } from "@/providers/UserProvider";
import { toast } from "@/components/ui/hooks/useToast";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { PageLayoutHeader } from "@/components/layouts/PageLayout";
import DialogCustomerService from "@/components/ui/DialogCustomerService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";




interface CustomerAgentChatDto {
    roomId: string
    message: string
    name: string | null
    userId: string | null
    createdAt: Date
}

interface CreateCustomerAgentRoomResponseDto {
    roomId: string,
    customerName: string,
    customerEmail: string,
    state: string,
    agentId: string | null,
    createdAt: Date
}


function Page() {

    const serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const [message, setMessage] = useState("");
    const [agentName, setAgentName] = useState("");
    const [info, setInfo] = useState<CreateCustomerAgentRoomResponseDto | undefined>();
    const [history, setHistory] = useState<CustomerAgentChatDto[]>([]);

    const socket = useSocket({ serverUrl });

    const scrollRef = useRef<any>(null);


    const handleReceiveChat = useCallback((data: CustomerAgentChatDto) => {
        setHistory((prevHistory) => [...prevHistory, data]);
    }, []);


    const formSchema = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
        },
    });

    const createRoom = async () => {
        const payload = {
            customerEmail: form.getValues().email,
            customerName: form.getValues().name,
        }

        try {
            const req = axios.post(`${baseUrl}rooms/customer-agent`, payload)
            const res = await req


            const a: CreateCustomerAgentRoomResponseDto = res.data.data;


            setInfo(a);



        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        setDialogOpen(true);
    }, [])

    useEffect(() => {

        if (socket && info) {
            socket.emit('join-room-customer', info.roomId)
            toast({
                title: "Connected",
                description: "You are now connected to the chat",
                variant: "success",
                duration: 1500,
            });
            console.log("Connected");

            setDialogOpen(false);
            setLoading(true);
        }

        return () => {

        }
    }, [info])






    // /rooms/customer-agent
    // export interface CreateCustomerAgentRoomRequestDto {
    //     customerEmail: string,
    //     customerName: string,
    // }





    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.lastElementChild.scrollTop = scrollRef.current.lastElementChild.scrollHeight + 1000;
        }
    }, [history])

    useEffect(() => {
        if (socket) {
            socket.on('receive-chat', handleReceiveChat);
            socket.on('agent-joined', (agentName: string) => {
                setAgentName(agentName)
            })
            return () => {
                toast({
                    title: "Disconnected From Chat",
                    description: "Something went wrong",
                    variant: "destructive",
                    duration: 1500,
                });
                socket.off('receive-chat', handleReceiveChat);
                socket.off('disconnect');
            };
        }
    }, [socket, handleReceiveChat]);


    // useEffect(() => {
    //     {
    //         if (socket) {
    //             socket.emit('join-room-agent', roomId)
    //             toast({
    //                 title: "Connected",
    //                 description: "You are now connected to the chat",
    //                 variant: "success",
    //                 duration: 1500,
    //             });
    //             console.log("Connected");
    //         }
    //     }
    // }, [flag])


    // const handleSendData = () => {
    //     if (socket) {

    //         const payload = {
    //             roomId: roomId,
    //             message: message,
    //             name: null,
    //             userId: null,
    //         }


    //         socket.emit('send-chat', payload);
    //     }

    // };



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
        setMessage("");
    }

    return (
        <>
            <DialogCustomerService dialogOpen={dialogOpen} form={form} onSubmit={createRoom} />

            <div className="w-full flex items-center pb-2">
                <PageLayoutHeader>
                    {loading && "Please Wait For Our Customer Support To Help You"}
                </PageLayoutHeader>
                {loading && <LoaderCircle className="h-8 w-8 ml-8  animate-spin" />}
            </div>
            {agentName && <ProfileInformation name={agentName} agent email="" title="Meet Your Customer Support !" />}

            <Card x-chunk="Page-07-chunk-1" className="">
                {/* Chat Box Container */}

                <ScrollArea className="h-[34rem] w-full rounded-md border p-6 flex flex-col-reverse" ref={scrollRef} >
                    {/* {history.map((chat, index) => {
                        if (chat.userId === id) {
                            return <SenderChatBubble key={index} name={name} time={chat.createdAt.toString()} message={chat.message} />
                        } else {
                            return <RecepientChatBubble key={index} name={chat.name} time={chat.createdAt.toString()} message={chat.message} />
                        }
                    })} */}
                    <RecepientChatBubble key={"1"} name={"name"} time={"chat.createdAt.toString()"} message={"chat.message"} />


                </ScrollArea>
                <CardFooter className="w-full flex item-center py-4">
                    <form className="w-full flex flex-row justify-between gap-4" onSubmit={onSubmit}>
                        <Input type="text" placeholder="Hello, how are you" value={message} onChange={(e) => setMessage(e.target.value)} />
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
        </>





    );
}

export default Page;
