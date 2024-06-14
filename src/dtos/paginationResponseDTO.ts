import { z, ZodTypeAny } from "zod";

export function createPaginationResponseDTOValidation<T extends ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    data: z.array(dataSchema),
    totalCount: z.number()
  });
}

export type PaginationResponseDTO<T> = {
  data: T[];
  totalCount: number;
};
