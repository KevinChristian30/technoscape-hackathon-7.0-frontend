import http from "@/lib/axios";
import { z } from "zod";

const meResponseValidation = z.object({
  sub: z.string(),
});

export type MeResponse = z.infer<typeof meResponseValidation>;

export const meGet = async () => {
  // const res = await http.get<MeResponse>("users/me");
  // return meResponseValidation.parse(res.data);
};
