import { PaginationRequestDTO } from "@/dtos/paginationRequestDTO";
import {
  createPaginationResponseDTOValidation,
  PaginationResponseDTO,
} from "@/dtos/paginationResponseDTO";
import http from "@/lib/axios";
import { z } from "zod";

const userListResponseValidation = z.object({
  email: z.string(),
  id: z.string(),
  name: z.string(),
  role: z.string(),
});

export type UserListResponse = z.infer<typeof userListResponseValidation>;

const paginationResponseDTOValidation = createPaginationResponseDTOValidation(
  userListResponseValidation
);

export type ListUsersPaginationResponse = z.infer<
  typeof paginationResponseDTOValidation
>;

export class UsersPaginationRequestDTO extends PaginationRequestDTO {
  constructor(
    public pageNumber: string | null,
    public perPage: string | null,
    public name: string | null
  ) {
    super(pageNumber, perPage);
  }

  override append(url: string): string {
    return `${super.append(url)}&name=${this.name ?? ""}`;
  }
}

export const listUsersGet = async (
  dto: UsersPaginationRequestDTO
): Promise<PaginationResponseDTO<UserListResponse>> => {
  const res = await http.get<ListUsersPaginationResponse>(dto.append("agents"));
  return paginationResponseDTOValidation.parse(res.data);
};
