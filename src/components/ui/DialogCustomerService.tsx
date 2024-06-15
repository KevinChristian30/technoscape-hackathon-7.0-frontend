"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "./Dialog";
import MHDForm from "../domain/MHDFom";
import MHDTextField from "../domain/MHDTextField";
import { Button } from "./Button";


const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;


interface DialogCustomerServiceProps {
    dialogOpen: boolean;
    form: any;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => any;
}

const DialogCustomerService = ({ dialogOpen, form, onSubmit }: DialogCustomerServiceProps) => {
    return (
        <Dialog open={dialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Start Chatting</DialogTitle>
                    <DialogDescription>
                        Enter your data, and we will queued with our customer support.
                    </DialogDescription>

                    <div className="h-4"></div>

                    <MHDForm
                        form={form}
                        className="space-y-4 mx-auto grid w-full gap-6"
                        onFormSubmit={onSubmit}
                    >
                        <MHDTextField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeHolder="Jon Doe"
                        />

                        <MHDTextField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeHolder="jon.doe@gmail.com"
                            type="email"
                        />

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Queue Chat
                        </Button>
                    </MHDForm>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCustomerService
