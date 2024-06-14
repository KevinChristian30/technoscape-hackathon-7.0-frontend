import {
  listUsersGet,
  UsersPaginationRequestDTO,
} from "@/services/users/listUsers.get";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (dto: UsersPaginationRequestDTO) =>
  useQuery({
    queryKey: ["listUsersGet"],
    queryFn: () => listUsersGet(dto),
    retry: 1,
  });
