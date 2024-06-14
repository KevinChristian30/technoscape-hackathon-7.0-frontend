import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const PageLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold md:text-2xl", className)}
    {...props}
  />
));
PageLayoutHeader.displayName = "PageLayoutHeader";

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
PageLayout.displayName = "PageLayout";

const PageLayoutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
PageLayoutHeader.displayName = "PageLayoutHeader";

export { PageLayout, PageLayoutHeader, PageLayoutContent };
