"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { useEmails } from "@/composables/emails/query/useEmails";
import {
  EmailListResponse,
  EmailsPaginationRequestDTO,
} from "@/services/email/listEmails.get";
import React from "react";
import MHDError from "../MHDError";
import MHDAgentAIChatbox from "../MHDAgentAIChatbox";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Button } from "@/components/ui/Button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Clipboard, Reply } from "lucide-react";
import { toast } from "@/components/ui/hooks/useToast";

const EmailSection = () => {
  const paginationDTO = new EmailsPaginationRequestDTO("1", "10");
  const { data, status, refetch, error } = useEmails(paginationDTO);

  function copy(text: string) {
    toast({
      title: "Text copied to clipboard",
      variant: "success",
    });
    navigator.clipboard.writeText(text);
  }

  if (status === "pending") {
    return <Skeleton className="w-full h-96" />;
  }

  if (status === "error") {
    return <MHDError></MHDError>;
  }

  const replyEmail = () => {
    
  }

  return (
    <div className="flex gap-2">
      <Card className="w-full">
        <ScrollArea className="h-full rounded-md border">
          <div className="p-4">
            {data.data.length <= 0
              ? "No Data"
              : data.data.map((email: EmailListResponse) => (
                  <div key={email.emailId}>
                    <Card className="p-4">
                      <CardTitle className="text-md">{email.subject}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {email.from}
                      </div>
                      <div className="h-4"></div>
                      <div className="text-md">
                        {email.bodyText.split("--00000")[0]}
                      </div>

                      <div className="flex justify-end w-full items-center gap-2">
                        <Button
                          size={"icon"}
                          onClick={() => {replyEmail}}
                        >
                          <Reply />
                        </Button>
                        <Button
                          size={"icon"}
                          onClick={() =>
                            copy(email.bodyText.split("--00000")[0])
                          }
                        >
                          <Clipboard />
                        </Button>
                      </div>
                    </Card>
                    <Separator className="my-2" />
                  </div>
                ))}
          </div>
        </ScrollArea>
      </Card>
      <MHDAgentAIChatbox className="w-full"></MHDAgentAIChatbox>
    </div>
  );
};

export default EmailSection;
