
  import { CustomersPaginationRequestDTO, listCustomersGet } from "@/services/users/listCustomers.get";
import { useQuery } from "@tanstack/react-query";
  
  export const useCustomers = (dto: CustomersPaginationRequestDTO) =>
    useQuery({
      queryKey: ["listCustomersGet"],
      queryFn: () => listCustomersGet(dto),
      retry: 1,
    });
  