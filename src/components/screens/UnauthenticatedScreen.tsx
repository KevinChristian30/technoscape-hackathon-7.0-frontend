"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import constants from "@/lib/constants";

const UnathenticatedScreen = () => {
  const cookie = useCookies();

  useEffect(() => {
    cookie.remove(constants.cookie.token);
  }, []);

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"session_expired.svg"}
            alt="MyHelpdesk"
            width={200}
            height={200}
            priority
          />
          <h1 className="text-2xl">Session Expired</h1>
        </div>
        <Link href={"/sign-in"}>
          <Button size={"lg"}>Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnathenticatedScreen;
