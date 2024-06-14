"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import React from "react";
import { Button } from "../ui/Button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SidePanelMobile = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        {routes.map((route) => {
          const isActive =
            (pathname.includes(route.url) && route.url.length > 1) ||
            pathname === route.url;

          return (
            <Link
              key={route.name}
              href={route.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                isActive ? "bg-muted text-primary" : " text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};

export default SidePanelMobile;
