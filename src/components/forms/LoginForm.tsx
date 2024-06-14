"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/composables/auth/mutation/useLogin";
import { toast } from "../ui/hooks/useToast";
import MHDForm from "../domain/MHDFom";
import MHDTextField from "../domain/MHDTextField";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import constants from "@/lib/constants";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1)
});

const LoginForm = () => {
  const cookies = useCookies();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, error, status, data } = useLogin();

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Something went wrong",
        description: error.response?.data.errors[0] ?? "Failed logging in",
        variant: "destructive"
      });
    } else if (status === "success") {
      cookies.set(constants.cookie.token, data.data.token, {
        expires: 1
      });

      toast({
        title: "Success",
        description: "Logged in, redirecting you soon",
        variant: "success"
      });
      form.reset();
      router.push("/");
    }
  }, [status]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <MHDForm
      form={form}
      className="space-y-4 mx-auto grid w-[350px] gap-6"
      onFormSubmit={onSubmit}
    >
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-4">
        <MHDTextField
          control={form.control}
          name="email"
          label="Email"
          placeHolder="jon.doe@gmail.com"
        />

        <MHDTextField
          control={form.control}
          name="password"
          label="Password"
          placeHolder="********"
          type="password"
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={status === "pending"}
        >
          Login
        </Button>
      </div>
    </MHDForm>
  );
};

export default LoginForm;
