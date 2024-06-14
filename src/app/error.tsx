"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/error.svg"}
            alt="Not Found"
            height={100}
            width={100}
            className="w-48 h-auto"
          />

          <h1 className="text-2xl">Something went wrong</h1>
        </div>
        <Link href={"/"}>
          <Button size={"lg"}>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
