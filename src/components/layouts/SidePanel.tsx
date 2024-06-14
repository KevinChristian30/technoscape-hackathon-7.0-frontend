"use client";

import { Role, Route, routeMap } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const SidePanel = () => {
  const pathname = usePathname();
  const { role } = useUser();

  const routes = useMemo<Route[]>((): Route[] => {
    return routeMap.get(role) ?? [];
  }, [role]);

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
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
              isActive ? "bg-muted text-primary" : " text-muted-foreground"
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidePanel;
