import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

export interface CreateQueuePayload {
  name: string;
  email: string;
  peerId: string;
}

const createQueueResponseValidation = makeResponseDTO(
  z.object({
    id: z.string(),
    customerName: z.string(),
    customerEmail: z.string(),
    createdAt: z.date(),
    peerJsID: z.string(),
  })
);

export type CreateQueueResponse = z.infer<typeof createQueueResponseValidation>;

export const createQueuePost = async (
  payload: CreateQueuePayload
): Promise<CreateQueueResponse> => {
  const res = await http.post<CreateQueueResponse>("live-call/queue", payload);
  return createQueueResponseValidation.parse(res.data);
};
