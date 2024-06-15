import { PaginationRequestDTO } from "@/dtos/paginationRequestDTO";
import {
  createPaginationResponseDTOValidation,
  PaginationResponseDTO,
} from "@/dtos/paginationResponseDTO";
import http from "@/lib/axios";
import { z } from "zod";

const emailListResponseValidation = z.object({
  emailId: z.number(),
  from: z.string(),
  date: z.string(),
  subject: z.string(),
  bodyText: z.any()
});

export type EmailListResponse = z.infer<typeof emailListResponseValidation>;

const paginationResponseDTOValidation = createPaginationResponseDTOValidation(
  emailListResponseValidation
);

export type ListEmailsPaginationResponse = z.infer<
  typeof paginationResponseDTOValidation
>;

export class EmailsPaginationRequestDTO extends PaginationRequestDTO {
  constructor(
    public pageNumber: string | null,
    public perPage: string | null
  ) {
    super(pageNumber, perPage);
  }

  override append(url: string): string {
    return `${super.append(url)}`;
  }
}

export const listEmailsGet = async (
  dto: EmailsPaginationRequestDTO
): Promise<PaginationResponseDTO<EmailListResponse>> => {
  const res = await http.get<ListEmailsPaginationResponse>(
    dto.append("emails")
  );
  return paginationResponseDTOValidation.parse(res.data);
};
