import { cn } from "@/lib/utils";
import React, { LegacyRef } from "react";

interface Props {
  reference: LegacyRef<HTMLVideoElement> | undefined;
  className?: string;
}

const MHDVideo = ({ reference, className }: Props) => {
  return <video ref={reference} className={cn("object-cover ", className)} />;
};

export default MHDVideo;
