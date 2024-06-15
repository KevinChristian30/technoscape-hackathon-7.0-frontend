"use client";

import React, { useMemo, useState } from "react";
import { useEmails } from "@/composables/emails/query/useEmails";
import {
  EmailListResponse,
  EmailsPaginationRequestDTO,
} from "@/services/email/listEmails.get";
import { Skeleton } from "@/components/ui/Skeleton";
import MHDError from "../MHDError";
import DOMPurify from "dompurify";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Card } from "@/components/ui/Card";

const getColumns = ({
  showDialog,
}: {
  showDialog: (id: number) => void;
}): ColumnDef<EmailListResponse>[] => {
  return [
    {
      accessorKey: "from",
      header: "From",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "view",
      header: "View",
      cell: ({ row }) => {
        return (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => showDialog(row.original.emailId)}
          >
            <Eye></Eye>
          </Button>
        );
      },
    },
  ];
};

const EmailTable = () => {
  const paginationDTO = new EmailsPaginationRequestDTO("1", "10");

  const { data, status, refetch, error } = useEmails(paginationDTO);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<
    EmailListResponse | undefined
  >();

  const emails = useMemo(() => {
    if (!data) return [];

    return data.data.map((email) => {
      return {
        ...email,
        bodyText: DOMPurify.sanitize(email.bodyText),
      };
    });
  }, [data]);

  const showDialog = (id: number) => {
    const email = emails.find((email) => email.emailId === id);

    if (!email) {
      return;
    }

    setSelectedEmail(email);
    setDialogOpen(true);
  };

  if (status === "pending") {
    return <Skeleton className="w-full h-96" />;
  }

  if (status === "error") {
    return <MHDError></MHDError>;
  }

  return (
    <div className="w-full flex h-full">
      <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEmail?.subject}</DialogTitle>
            <DialogDescription>
              {selectedEmail?.from} - {selectedEmail?.date}
            </DialogDescription>
          </DialogHeader>

          <Card className="p-8">
            <div
              dangerouslySetInnerHTML={{ __html: selectedEmail?.bodyText }}
            ></div>
          </Card>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={getColumns({ showDialog: showDialog })}
        data={data.data}
      />
    </div>
  );
};

export default EmailTable;
