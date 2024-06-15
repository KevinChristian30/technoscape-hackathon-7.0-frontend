import {
  customerAIChat,
  CustomerAIChatRequestPayload,
  CustomerAIChatResponse,
} from "@/services/ai/ai.chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCustomerAIChat = () =>
  useMutation<
    CustomerAIChatResponse,
    AxiosError<any>,
    CustomerAIChatRequestPayload,
    unknown
  >({
    mutationFn: customerAIChat,
  });
