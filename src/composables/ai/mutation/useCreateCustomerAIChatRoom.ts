import {
  CreateCustomerAIChatRoomPayload,
  createCustomerAIChatRoomPost,
  CreateCustomerAIChatRoomResponse,
} from "@/services/ai/createCustomerAIChatRoom.post";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateCustomerAIChatRoom = () =>
  useMutation<
    CreateCustomerAIChatRoomResponse,
    AxiosError<any>,
    CreateCustomerAIChatRoomPayload,
    unknown
  >({
    mutationFn: createCustomerAIChatRoomPost,
  });
