import { z, ZodTypeAny } from "zod";

export function createPaginationResponseDTOValidation<T extends ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    data: z.array(dataSchema),
  });
}

export type PaginationResponseDTO<T> = {
  data: T[];
};
