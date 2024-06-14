"use client";

import MHDError from "@/components/domain/MHDError";
import MHDVideo from "@/components/domain/MHDVideo";
import { PageLayout, PageLayoutHeader } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCallQueue } from "@/composables/queue/query/useCallQueue";
import {
  Mic,
  MicOff,
  ScreenShare,
  Unplug,
  Video,
  VideoOff,
} from "lucide-react";
import { Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const [peerId, setPeerId] = useState<string | undefined>();
  const peerInstance = useRef<Peer | null>(null);
  const currentPeer = useRef<RTCPeerConnection | null>(null);
  const remoteAudioRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const [connected, setConnected] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [micOn, setMicOn] = useState<boolean>(false);

  const { data, error, status } = useCallQueue();

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id: any) => {
      setPeerId(id);
      console.log(id);
    });

    peer.on("call", async (call: any) => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: cameraOn,
        audio: micOn,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.volume = 0;
        localVideoRef.current.play();
      }
      call.answer(mediaStream);
      call.on("stream", (remoteStream: any) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
          currentPeer.current = call.peerConnection;
          setConnected(true);
        }
      });
    });

    peer.on("disconnected", () => {
      console.log("Peer disconnected");
    });

    peer.on("close", () => {
      console.log("Peer connection closed");
      cleanup();
    });
    peerInstance.current = peer;
    return () => {
      peer.off("open");
      peer.off("call");
      peer.off("disconnected");
      peer.off("close");
      peer.destroy();
    };
  }, []);

  if (status === "pending") {
    return <Skeleton className="w-full h-96"></Skeleton>;
  }

  if (status === "error") {
    return <MHDError />;
  }

  const cleanup = () => {
    if (localVideoRef.current?.srcObject) {
      const tracks = (
        localVideoRef.current.srcObject as MediaStream
      ).getTracks();
      tracks.forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteAudioRef.current?.srcObject) {
      const tracks = (
        remoteAudioRef.current.srcObject as MediaStream
      ).getTracks();
      tracks.forEach((track) => track.stop());
      remoteAudioRef.current.srcObject = null;
    }

    if (currentPeer.current) {
      currentPeer.current.close();
      currentPeer.current = null;
    }

    setConnected(false);
  };

  const callOnclick = async (id: string) => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (peerInstance.current && id) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.volume = 0;
        localVideoRef.current.play();
      }
      const call = peerInstance.current.call(id, mediaStream);
      call.on("stream", (remoteStream: any) => {
        if (remoteAudioRef && remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
          currentPeer.current = call.peerConnection;
          call.peerConnection.iceConnectionState;
          setConnected(true);
        }
      });
    }
  };

  const shareScreenOnClick = async () => {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    const videoTrack = mediaStream.getVideoTracks()[0];
    let sender = currentPeer.current?.getSenders().find((s) => {
      return s.track?.kind == videoTrack.kind;
    });
    sender?.replaceTrack(videoTrack);
  };

  return (
    <PageLayout>
      <PageLayoutHeader>Customer Calls</PageLayoutHeader>

      <div className="h-4"></div>

      <div className="flex gap-2 h-[500px] w-full items-center justify-center">
        <div className="p-4 overflow-auto w-72">
          <ScrollArea className=" h-[500px] rounded-md border">
            <div className="p-4">
              {data.data.length <= 0
                ? "No Data"
                : data.data.map((tag: any) => (
                    <div key={tag}>
                      <Button
                        className="w-full"
                        onClick={() => {
                          callOnclick(tag.peerJsID);
                        }}
                      >
                        {tag.customerName.slice(0, 16)}
                      </Button>
                      <Separator className="my-2" />
                    </div>
                  ))}
            </div>
          </ScrollArea>
        </div>

        <div className="w-full relative">
          <div className="w-full">
            <MHDVideo
              reference={remoteAudioRef}
              className="bg-muted-foreground w-full h-[500px] rounded-md"
            />
          </div>
          <div className="absolute bottom-[16px] right-[16px]">
            <MHDVideo
              reference={localVideoRef}
              className="bg-muted w-36 h-36 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="h-4"></div>

      {connected && (
        // <div className="flex gap-4 justify-end">
        //   {cameraOn ? (
        //     <Button
        //       variant={"default"}
        //       size={"icon"}
        //       onClick={() => setCameraOn(false)}
        //     >
        //       <Video />
        //     </Button>
        //   ) : (
        //     <Button
        //       variant={"outline"}
        //       size={"icon"}
        //       className="border border-primary text-primary hover:text-primary"
        //       onClick={() => setCameraOn(true)}
        //     >
        //       <VideoOff />
        //     </Button>
        //   )}
        //   {micOn ? (
        //     <Button
        //       variant={"default"}
        //       size={"icon"}
        //       onClick={() => setMicOn(false)}
        //     >
        //       <Mic />
        //     </Button>
        //   ) : (
        //     <Button
        //       variant={"outline"}
        //       size={"icon"}
        //       className="border border-primary text-primary hover:text-primary"
        //       onClick={() => setMicOn(true)}
        //     >
        //       <MicOff />
        //     </Button>
        //   )}
        <div className="flex gap-4 justify-end">
          <Button onClick={shareScreenOnClick} className="flex gap-2">
            <ScreenShare className="w-4 h-4" />
            Share Screen
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              peerInstance.current?.disconnect;
              cleanup();
            }}
            className="flex gap-2"
          >
            <Unplug className="w-4 h-4" /> Disconnect
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default Page;
