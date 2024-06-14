"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

const UnauthorizedScreen = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, []);

  return (
    <div className="w-screen h-screen grid place-items-center absolute top-0 left-0">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"session_expired.svg"}
            alt="MyHelpdesk"
            width={200}
            height={200}
            priority
          />
          <h1 className="text-2xl">You are unauthorized to view this page</h1>
        </div>
        <Button
          size={"lg"}
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedScreen;
