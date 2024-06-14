import { meGet } from "@/services/auth/me.get";
import { useQuery } from "@tanstack/react-query";

export const useMe = () =>
  useQuery({
    queryKey: ["meGet"],
    queryFn: meGet,
    retry: 1,
  });
