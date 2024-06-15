"use client";

import MHDForm from "@/components/domain/MHDFom";
import MHDTextField from "@/components/domain/MHDTextField";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { toast } from "@/components/ui/hooks/useToast";
import { useCreateCustomerAIChatRoom } from "@/composables/ai/mutation/useCreateCustomerAIChatRoom";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

      console.log(data);

      setDialogOpen(false);
    }
  }, [status, data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      customerEmail: values.email,
      customerName: values.name,
    });
  }

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
              onFormSubmit={onSubmit}
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
    </div>
  );
};

export default Page;
