import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef } from "react";
import SenderChatBubble from "./SenderChatBubble";
import RecepientChatBubble from "./RecepientChatBubble";
import { ScrollBar } from "../ui/ScrollArea";


interface CustomerAgentChatDto {
    roomId: string
    message: string
    name: string | null
    userId: string | null
    createdAt: Date
}


const MyChatComponent: React.FC<{ history: CustomerAgentChatDto[]; id: string; name: string }> = ({ history, id, name }) => {
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom whenever history changes
        // if (scrollAreaRef.current) {
        //     scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        // }
    }, [history]);

    return (
        <ScrollArea ref={scrollAreaRef} className="h-[34rem] w-full rounded-md border p-6 flex flex-col">
            {history.map((chat, index) => (
                chat.userId === id ? (
                    <SenderChatBubble key={index} name={name} time={chat.createdAt.toString()} message={chat.message} />
                ) : (
                    <RecepientChatBubble key={index} name={chat.name} time={chat.createdAt.toString()} message={chat.message} />
                )
            ))}
            <ScrollBar /> {/* Ensure ScrollBar is included for proper functionality */}
        </ScrollArea>
    );
};

export default MyChatComponent