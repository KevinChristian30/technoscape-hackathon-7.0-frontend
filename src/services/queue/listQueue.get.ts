import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

const listQueueResponseValidation = makeResponseDTO(
  z.array(
    z.object({
      id: z.string(),
      customerName: z.string(),
      customerEmail: z.string(),
      createdAt: z.date(),
      peerJsID: z.string(),
    })
  )
);

export type ListQueueResponse = z.infer<typeof listQueueResponseValidation>;

export const listQueueGet = async (): Promise<ListQueueResponse> => {
  const res = await http.get<ListQueueResponse>("live-call/queue");
  return listQueueResponseValidation.parse(res.data);
};
