import http from "@/lib/axios";
import { z } from "zod";

export interface AgentAIChatRequestPayload {
  roomId: string;
  message: string;
  agentId: string;
}

const agentAIChatResponseValidation = z.object({
  data: z.object({ message: z.string() }),
});

export type AgentAIChatResponse = z.infer<typeof agentAIChatResponseValidation>;

export const agentAIChat = async (
  payload: AgentAIChatRequestPayload
): Promise<AgentAIChatResponse> => {
  const res = await http.post<AgentAIChatResponse>("chats/agent-ai", payload);
  return agentAIChatResponseValidation.parse(res.data);
};
