"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/not_found.svg"}
            alt="Not Found"
            height={100}
            width={100}
            className="w-48 h-auto"
          />

          <h1 className="text-2xl">Page Not Found</h1>
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

export default NotFound;
