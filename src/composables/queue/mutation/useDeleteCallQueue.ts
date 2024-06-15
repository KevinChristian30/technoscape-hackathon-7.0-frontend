import { DeleteQueuePayload, deleteQueuePost, DeleteQueueResponse } from "@/services/queue/deleteQueue.delete";
  import { useMutation } from "@tanstack/react-query";
  import { AxiosError } from "axios";
  
  export const useDeleteCallQueue = () =>
    useMutation<
      DeleteQueueResponse,
      AxiosError<any>,
      DeleteQueuePayload,
      unknown
    >({
      mutationFn: deleteQueuePost,
    });
  