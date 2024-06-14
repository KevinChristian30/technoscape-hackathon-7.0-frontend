import { z } from "zod";

const makeResponseDTO = (response: z.AnyZodObject) => {
  return z.object({
    data: response
  });
};

export default makeResponseDTO;
