import http from "@/lib/axios";

export interface ReplyEmailPayload {
  emailId: number;
  email: string;
  message: string;
}

export const replyEmailPost = async (payload: ReplyEmailPayload): Promise<void> => {
  await http.post<void>("emails/reply", payload);
};
