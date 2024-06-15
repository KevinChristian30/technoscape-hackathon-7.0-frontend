"use client";

import MHDForm from "@/components/domain/MHDFom";
import MHDTextField from "@/components/domain/MHDTextField";
import MHDVideoCall from "@/components/domain/MHDVideoCall";
import LoadingScreen from "@/components/screens/LoadingScreen";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { toast } from "@/components/ui/hooks/useToast";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCreateCallQueue } from "@/composables/queue/mutation/useCreateCallQueue";
import { createQueuePost } from "@/services/queue/createQueue.post";
import useSocket from "@/socket/useSocket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
});

const Page = () => {
  const serverUrl = process.env.NEXT_PUBLIC_BASE_URL + "live-call/queue" || "";
  const socket = useSocket({ serverUrl: serverUrl });
  const [peerId, setPeerId] = useState<string | undefined>();
  const peerInstance = useRef<Peer | null>(null);
  const currentPeer = useRef<RTCPeerConnection | null>(null);
  const remoteAudioRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const localMediaStream = useRef<MediaStream | null>(null);

  const [connected, setConnected] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(true);
  const [micOn, setMicOn] = useState<boolean>(true);
  const [flag, setFlag] = useState(false);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { mutate, data, status, error } = useCreateCallQueue();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  useEffect(() => {
    if (socket) {
      setFlag(true);
    }
  }, [socket]);

  useEffect(() => {
    {
      console.log(flag);
      if (socket) {
        socket.emit("join-room");
        console.log("Connected");
      }
    }
  }, [flag]);

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

  useEffect(() => {
    setDialogOpen(true);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // mutate({
    //   email: values.email,
    //   name: values.name,
    //   peerId: peerId!,
    // });
    const data = await createQueuePost({
      email: values.email,
      name: values.name,
      peerId: peerId!,
    });
    toast({
      title: "Success",
      description: "Call query submitted, we will be with you soon",
      variant: "success",
    });

    setDialogOpen(false);
    socket?.emit("new-queue-added");
  }

  // useEffect(() => {
  //   if (status === "error") {
  //     toast({
  //       title: "Something went wrong",
  //       description:
  //         error.response?.data.errors[0] ?? "Failed creating call query",
  //       variant: "destructive",
  //     });
  //   } else if (status === "success") {
  //     toast({
  //       title: "Success",
  //       description: "Call query submitted, we will be with you soon",
  //       variant: "success",
  //     });

  //     setDialogOpen(false);
  //   }
  // }, [status, data]);

  if (!peerId) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <>
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Call</DialogTitle>
            <DialogDescription>
              Enter your data, and we will queue you a call with our best
              customer service.
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
                isLoading={status === "pending"}
              >
                Queue Call
              </Button>
            </MHDForm>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="grid place-items-center h-screen">
        <div>
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
      </div>
    </>
  );
};

export default Page;
