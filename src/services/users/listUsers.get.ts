import { PaginationRequestDTO } from "@/dtos/paginationRequestDTO";
import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

const userListResponseValidation = makeResponseDTO(
  z.object({
    agents: z.array(
      z.object({
        email: z.string(),
        id: z.string(),
        name: z.string(),
        role: z.string(),
      })
    ),
  })
);

export type UserListResponse = z.infer<typeof userListResponseValidation>;

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
): Promise<UserListResponse> => {
  const res = await http.get<UserListResponse>(dto.append("users"));
  return userListResponseValidation.parse(res.data);
};
