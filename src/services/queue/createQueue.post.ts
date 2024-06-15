import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

export interface CreateQueuePayload {
}

const createQueueResponseValidation = makeResponseDTO(
  z.object({
    token: z.string(),
  }),
);

export type CreateQueueResponse = z.infer<typeof createQueueResponseValidation>;

export const loginPost = async (
  payload: CreateQueuePayload,
): Promise<CreateQueueResponse> => {
  const res = await http.post<CreateQueueResponse>("live-call/queue", payload);
  return createQueueResponseValidation.parse(res.data);
};
