"use client";

import MHDError from "@/components/domain/MHDError";
import MHDVideoCall from "@/components/domain/MHDVideoCall";
import { PageLayout, PageLayoutHeader } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCallQueue } from "@/composables/queue/query/useCallQueue";
import { Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const [peerId, setPeerId] = useState<string | undefined>();
  const peerInstance = useRef<Peer | null>(null);
  const currentPeer = useRef<RTCPeerConnection | null>(null);
  const remoteAudioRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const localMediaStream = useRef<MediaStream | null>(null);

  const [connected, setConnected] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [micOn, setMicOn] = useState<boolean>(false);

  const { data, status } = useCallQueue();

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
      localMediaStream.current = mediaStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.volume = 0;
        localVideoRef.current.play();
      }
      call.answer(localMediaStream.current);
      call.on("stream", (remoteStream: any) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
          currentPeer.current = call.peerConnection;
          setConnected(true);
        }
      });
    });

    peer.on("disconnected", () => {});

    peer.on("close", () => {
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
    localMediaStream.current = mediaStream;
    if (peerInstance.current && id) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localMediaStream.current;
        localVideoRef.current.volume = 0;
        localVideoRef.current.play();
      }
      const call = peerInstance.current.call(id, localMediaStream.current);
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

  const toggleCamera = () => {
    setCameraOn((prevState) => !prevState);
    if (localMediaStream.current) {
      localMediaStream.current.getVideoTracks()[0].enabled = cameraOn;
    }
  };

  const toggleMic = () => {
    setMicOn((prevState) => !prevState);
    if (localMediaStream.current) {
      localMediaStream.current.getAudioTracks()[0].enabled = micOn;
    }
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

        <MHDVideoCall
          cleanup={cleanup}
          localRef={localVideoRef}
          remoteRef={remoteAudioRef}
          onShareScreenClick={shareScreenOnClick}
          peerInstance={peerInstance}
          connected={connected}
          cameraOn={cameraOn}
          toggleCamera={toggleCamera}
          micOn={micOn}
          setMicOn={setMicOn}
          toggleMic={toggleMic}
        />
      </div>
    </PageLayout>
  );
};

export default Page;
