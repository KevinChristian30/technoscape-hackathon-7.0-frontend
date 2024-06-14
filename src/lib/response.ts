import { z, ZodTypeAny } from "zod";

export function makeResponseDTO<T extends ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: z.array(dataSchema),
  });
}

export type ResponseDTO<T> = {
  data: T[];
};

export default makeResponseDTO;
