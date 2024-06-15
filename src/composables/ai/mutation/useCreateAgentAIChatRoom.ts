import {
  CreateAgentAIChatRoomPayload,
  createAgentAIChatRoomPost,
  CreateAgentAIChatRoomResponse,
} from "@/services/ai/createAgentAIChatRoom.post";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateAgentAIChatRoom = () =>
  useMutation<
    CreateAgentAIChatRoomResponse,
    AxiosError<any>,
    CreateAgentAIChatRoomPayload,
    unknown
  >({
    mutationFn: createAgentAIChatRoomPost,
  });
