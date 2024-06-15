import http from "@/lib/axios";
import { z } from "zod";

export interface CustomerAIChatRequestPayload {
  roomId: string;
  message: string;
  customerName: string;
}

const customerAIChatRequestPayload = z.object({
  data: z.object({ message: z.string() }),
});

export type CustomerAIChatResponse = z.infer<
  typeof customerAIChatRequestPayload
>;

export const customerAIChat = async (
  payload: CustomerAIChatRequestPayload
): Promise<CustomerAIChatResponse> => {
  const res = await http.post<CustomerAIChatResponse>(
    "chats/customer-ai",
    payload
  );
  return customerAIChatRequestPayload.parse(res.data);
};
