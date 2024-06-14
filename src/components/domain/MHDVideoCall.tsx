import React, { LegacyRef, MutableRefObject, SetStateAction } from "react";
import MHDVideo from "./MHDVideo";
import { Button } from "../ui/Button";
import {
  Mic,
  MicOff,
  ScreenShare,
  Unplug,
  Video,
  VideoOff,
} from "lucide-react";
import Peer from "peerjs";

interface Props {
  localRef: LegacyRef<HTMLVideoElement> | undefined;
  remoteRef: LegacyRef<HTMLVideoElement> | undefined;
  onShareScreenClick: () => void;
  peerInstance: MutableRefObject<Peer | null>;
  cleanup: () => void;
  connected: boolean;
  cameraOn: boolean;
  toggleCamera: () => void;
  micOn: boolean;
  toggleMic: () => void;
  setMicOn: React.Dispatch<SetStateAction<boolean>>;
}

const MHDVideoCall = ({
  localRef,
  remoteRef,
  onShareScreenClick,
  peerInstance,
  cleanup,
  connected,
  cameraOn,
  toggleCamera,
  micOn,
  setMicOn,
  toggleMic,
}: Props) => {
  return (
    <div className="w-full border-2 rounded-md p-4">
      <div className="w-full relative">
        <div className="w-full">
          <MHDVideo
            reference={remoteRef}
            className="bg-muted-foreground w-full h-[500px] rounded-md"
          />
        </div>
        <div className="absolute bottom-[16px] right-[16px]">
          <MHDVideo
            reference={localRef}
            className="bg-muted w-36 h-36 rounded-md"
          />
        </div>
      </div>

      <div className="h-4"></div>

      <div className="w-full flex items-center justify-end gap-2">
        {!micOn ? (
          <Button
            variant={"default"}
            size={"icon"}
            onClick={toggleMic}
          >
            <Mic />
          </Button>
        ) : (
          <Button
            variant={"outline"}
            size={"icon"}
            className="border border-primary text-primary hover:text-primary"
            onClick={toggleMic}
          >
            <MicOff />
          </Button>
        )}

        {!cameraOn ? (
          <Button variant={"default"} size={"icon"} onClick={toggleCamera}>
            <Video />
          </Button>
        ) : (
          <Button
            variant={"outline"}
            size={"icon"}
            className="border border-primary text-primary hover:text-primary"
            onClick={toggleCamera}
          >
            <VideoOff />
          </Button>
        )}
        <Button onClick={onShareScreenClick} className="flex gap-2">
          <ScreenShare className="w-4 h-4" />
          Share Screen
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            peerInstance?.current?.disconnect;
            cleanup();
          }}
          className="flex gap-2"
        >
          <Unplug className="w-4 h-4" /> Disconnect
        </Button>
      </div>
    </div>
  );
};

export default MHDVideoCall;
