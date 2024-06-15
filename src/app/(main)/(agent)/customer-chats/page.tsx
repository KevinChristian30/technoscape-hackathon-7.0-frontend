"use client"
import {
    PageLayout,
    PageLayoutContent,
    PageLayoutHeader,
} from "@/components/layouts/PageLayout";
import AgentsTable from "@/components/tables/AgentsTable";
import CustomerChatTable from "@/components/tables/CustomerChatTable";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";


export interface CustomerAgentRoomResponseDto {
    roomId: string,
    customerName: string,
    customerEmail: string,
    state: string,
    agentId: string | null,
    createdAt: Date
}


const Page = () => {
    const [value, setvalue] = useState(false);

    return (
        <PageLayout>
            <PageLayoutHeader className="flex justify-between items-center w-full">
                Customer Request
                <div className="flex items-center justify-center gap-2">
                    <Switch id="auto_refresh" onClick={() => setvalue(!value)} />
                    <Label htmlFor="auto_refresh">
                        Auto Refresh
                    </Label>
                </div>
            </PageLayoutHeader>

            <div className="h-8"></div>

            <PageLayoutContent>
                <CustomerChatTable refresh={value} />
            </PageLayoutContent>
        </PageLayout>
    );
};

export default Page;
