"use client";

import { useCreateUser } from "@/composables/users/mutation/useCreateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/hooks/useToast";
import { useRouter } from "next/navigation";
import MHDForm from "../domain/MHDFom";
import MHDTextField from "../domain/MHDTextField";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
});

const CreateAgentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();
  const { mutate, error, status, data } = useCreateUser();

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Something went wrong",
        description: error.response?.data.errors[0] ?? "Failed creating agent",
        variant: "destructive",
      });
    } else if (status === "success") {
      toast({
        title: "Success",
        description: "Agent created",
        variant: "success",
      });
      router.push("/agents");
    }
  }, [status, error, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Card className="p-8 bg-muted/50">
      <MHDForm
        form={form}
        className="space-y-4 w-[300px] lg:w-[500px]"
        onFormSubmit={onSubmit}
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Create Agent</h1>
          <p className="text-balance text-muted-foreground">
            Enter the data to create an agent
          </p>
        </div>

        <div className="grid gap-4">
          <MHDTextField
            control={form.control}
            name="email"
            label="Email"
            placeHolder="jon.doe@gmail.com"
            type="email"
          />

          <MHDTextField
            control={form.control}
            name="password"
            label="Password"
            placeHolder="********"
            type="password"
          />

          <MHDTextField
            control={form.control}
            name="name"
            label="Name"
            placeHolder="John Doe"
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={status === "pending"}
          >
            Create Agent
          </Button>
        </div>
      </MHDForm>
    </Card>
  );
};

export default CreateAgentForm;
