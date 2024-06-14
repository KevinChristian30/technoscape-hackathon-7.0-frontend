import {
  EmailsPaginationRequestDTO,
  listEmailsGet,
} from "@/services/email/listEmails.get";
import { useQuery } from "@tanstack/react-query";

export const useEmails = (dto: EmailsPaginationRequestDTO) =>
  useQuery({
    queryKey: ["listEmailsGet"],
    queryFn: () => listEmailsGet(dto),
    retry: 1,
  });
