import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

export interface CreateAgentAIChatRoomPayload {
  agentId: string;
}

const createCustomerAIChatRoomResponseValidation = z.object({
  data: z.object({
    roomId: z.string(),
    agentId: z.string(),
    createdAt: z.string(),
  }),
});

export type CreateAgentAIChatRoomResponse = z.infer<
  typeof createCustomerAIChatRoomResponseValidation
>;

export const createAgentAIChatRoomPost = async (
  payload: CreateAgentAIChatRoomPayload
): Promise<CreateAgentAIChatRoomResponse> => {
  const res = await http.post<CreateAgentAIChatRoomResponse>(
    "rooms/agent-ai",
    payload
  );
  return createCustomerAIChatRoomResponseValidation.parse(res.data);
};
