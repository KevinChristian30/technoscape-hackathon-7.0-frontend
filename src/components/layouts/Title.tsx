import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";

const Title = () => {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="">Acme Inc</span>
      </Link>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </>
  );
};

export default Title;
