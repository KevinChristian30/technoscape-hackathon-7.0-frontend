import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import Image from "next/image";

const Title = () => {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Image
          src={"/logo.svg"}
          alt="Logo"
          height={100}
          width={100}
          className="h-6 w-6"
        />
        <span className="">MyHelpdesk</span>
      </Link>
      <Button variant="outline" size="icon" className="ml-auto">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </>
  );
};

export default Title;
