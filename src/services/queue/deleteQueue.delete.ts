import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

export interface DeleteQueuePayload {
  name: string;
  email: string;
  peerId: string;
}

const deleteQueueResponseValidation = makeResponseDTO(
  z.object({
    id: z.string(),
    customerName: z.string(),
    customerEmail: z.string(),
    createdAt: z.date(),
    peerJsID: z.string(),
  })
);

export type DeleteQueueResponse = z.infer<typeof deleteQueueResponseValidation>;

export const deleteQueuePost = async (
  payload: DeleteQueuePayload
): Promise<DeleteQueueResponse> => {
  const res = await http.post<DeleteQueueResponse>("live-call/queue/delete", payload);
  return deleteQueueResponseValidation.parse(res.data);
};
