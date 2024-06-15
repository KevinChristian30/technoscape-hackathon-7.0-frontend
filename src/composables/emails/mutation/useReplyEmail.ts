import {
  ReplyEmailPayload,
  replyEmailPost,
} from "@/services/email/replyEmail.post";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useReplyEmail = () =>
  useMutation<void, AxiosError<any>, ReplyEmailPayload, unknown>({
    mutationFn: replyEmailPost,
  });
