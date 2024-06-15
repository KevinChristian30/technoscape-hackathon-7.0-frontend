import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

export interface CreateCustomerAIChatRoomPayload {
  customerName: string;
  customerEmail: string;
}

const createCustomerAIChatRoomResponseValidation = makeResponseDTO(
  z.object({
    data: z.object({
      roomId: z.string(),
      customerName: z.string(),
      customerEmail: z.string(),
      createdAt: z.string(),
    }),
  })
);

export type CreateCustomerAIChatRoomResponse = z.infer<
  typeof createCustomerAIChatRoomResponseValidation
>;

export const createCustomerAIChatRoomPost = async (
  payload: CreateCustomerAIChatRoomPayload
): Promise<CreateCustomerAIChatRoomResponse> => {
  const res = await http.post<CreateCustomerAIChatRoomResponse>(
    "rooms/customer-ai",
    payload
  );
  return createCustomerAIChatRoomResponseValidation.parse(res.data);
};
