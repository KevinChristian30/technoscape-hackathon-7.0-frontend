"use client";
import SidePanelMobile from "@/components/layouts/SidePanelMobile";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/Separator";
import { List } from "lucide-react";
import { Peer } from "peerjs";
import {
  AudioHTMLAttributes,
  DetailedHTMLProps,
  DetailedReactHTMLElement,
  LegacyRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

const Page = () => {
  const [peerId, setPeerId] = useState<string | undefined>();
  const [targetPeerId, setTargetPeerId] = useState<string | undefined>();
  const peerInstance = useRef<Peer | null>(null);
  const currentPeer = useRef<RTCPeerConnection | null>(null);
  const remoteAudioRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", async (call) => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.volume = 0;
        localVideoRef.current.play();
      }
      call.answer(mediaStream);
      call.on("stream", (remoteStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
          currentPeer.current = call.peerConnection;
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
  };

  const callOnclick = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (peerInstance.current && targetPeerId) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.volume = 0;
        localVideoRef.current.play();
      }
      const call = peerInstance.current.call(targetPeerId, mediaStream);
      call.on("stream", (remoteStream) => {
        if (remoteAudioRef && remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
          currentPeer.current = call.peerConnection;
          call.peerConnection.iceConnectionState;
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

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <>
      <div className="w-1/4 bg-white p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Queue</h2>
        <ScrollArea className="w-48 rounded-md border">
          {tags.map((tag) => (
            <>
              <div key={tag} className="text-sm p-4">
                {tag}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </ScrollArea>
      </div>
      <Input type="text" onChange={(e) => setTargetPeerId(e.target.value)} />
      <Button onClick={callOnclick}>Call</Button>
      <Button onClick={shareScreenOnClick}>Share Screen</Button>
      <Button
        onClick={() => {
          peerInstance.current?.disconnect;
          cleanup();
        }}
      >
        Disconnect
      </Button>
      <div>
        <video ref={remoteAudioRef} />
      </div>
      <div>
        <video ref={localVideoRef} />
      </div>
    </>
  );
};

export default Page;
