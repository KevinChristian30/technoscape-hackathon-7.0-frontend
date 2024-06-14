import { z, ZodTypeAny } from "zod";

export function makeResponseDTO<T>(dataSchema: T) {
  return z.object({
    data: z.any(),
  });
}

export type ResponseDTO<T> = {
  data: T;
};

export default makeResponseDTO;
