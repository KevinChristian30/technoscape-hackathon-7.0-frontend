import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Card className="p-8 bg-muted">
        <h1 className="text-4xl">Customer Service</h1>

        <div className="h-8"></div>

        <div className="flex flex-col gap-2">
          <Link href={"/ai-chat"}>
            <Button className="w-full">Chat with AI (Recommended)</Button>
          </Link>
          <Link href={"/chat"}>
            <Button className="w-full">Chat with Customer Service</Button>
          </Link>

          <Link href={"/call"}>
            <Button className="w-full">Call Customer Service</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Page;
