import http from "@/lib/axios";
import makeResponseDTO from "@/lib/response";
import { z } from "zod";

const meResponseValidation = makeResponseDTO(
  z.object({
    email: z.string(),
    id: z.string(),
    name: z.string(),
    role: z.string()
  })
);

export type MeResponse = z.infer<typeof meResponseValidation>;

export const meGet = async (): Promise<MeResponse> => {
  const res = await http.get<MeResponse>("user");
  return meResponseValidation.parse(res.data);
};
