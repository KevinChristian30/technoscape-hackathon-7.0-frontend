import { listUsersGet } from "@/services/users/listUsers.get";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () =>
  useQuery({
    queryKey: ["listUsersGet"],
    queryFn: () => listUsersGet,
    retry: 1,
  });
