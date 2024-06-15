import { PaginationRequestDTO } from "@/dtos/paginationRequestDTO";
import {
  createPaginationResponseDTOValidation,
  PaginationResponseDTO,
} from "@/dtos/paginationResponseDTO";
import http from "@/lib/axios";
import { z } from "zod";


const customerListResponseValidation = z.object({
  roomId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  state: z.string(),
  agentId: z.string().nullable(),
  createdAt: z.string(),
});

export type CustomerListResponse = z.infer<typeof customerListResponseValidation>;

const paginationResponseDTOValidation = createPaginationResponseDTOValidation(
  customerListResponseValidation
);

export type ListCustomersPaginationResponse = z.infer<
  typeof paginationResponseDTOValidation
>;

export class CustomersPaginationRequestDTO extends PaginationRequestDTO {
  constructor(
    public pageNumber: string | null,
    public perPage: string | null,
  ) {
    super(pageNumber, perPage);
  }
}

export const listCustomersGet = async (
  dto: CustomersPaginationRequestDTO
): Promise<PaginationResponseDTO<CustomerListResponse>> => {
  const res = await http.get<ListCustomersPaginationResponse>(dto.append(process.env.NEXT_PUBLIC_BASE_URL
     + "rooms/customer-agent/pending"));
  return paginationResponseDTOValidation.parse(res.data);
};
