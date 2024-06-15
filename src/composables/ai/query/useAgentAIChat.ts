import {
  agentAIChat,
  AgentAIChatRequestPayload,
  AgentAIChatResponse,
} from "@/services/ai/ai-agent.chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAgentAIChat = () =>
  useMutation<
    AgentAIChatResponse,
    AxiosError<any>,
    AgentAIChatRequestPayload,
    unknown
  >({
    mutationFn: agentAIChat,
  });
