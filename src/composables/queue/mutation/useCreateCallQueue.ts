import {
  CreateQueuePayload,
  createQueuePost,
  CreateQueueResponse,
} from "@/services/queue/createQueue.post";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateCallQueue = () =>
  useMutation<
    CreateQueueResponse,
    AxiosError<any>,
    CreateQueuePayload,
    unknown
  >({
    mutationFn: createQueuePost,
  });
