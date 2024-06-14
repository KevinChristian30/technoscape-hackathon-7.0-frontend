"use client";

import constants from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const cookie = useCookies();
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOut = async () => {
    cookie.remove(constants.cookie.token);
    queryClient.clear();
    router.push("/login");
  };

  useEffect(() => {
    signOut();
  }, []);

  return <div></div>;
};

export default Page;
