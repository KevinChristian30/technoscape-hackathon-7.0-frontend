import http from "@/lib/axios";
import { z } from "zod";

export interface LoginPayload {
  email: string;
  password: string;
}

const loginResponseValidation = z.object({
  token: z.string()
});

export type LoginResponse = z.infer<typeof loginResponseValidation>;

export const loginPost = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await http.post<LoginResponse>("auth/login", payload);
  return loginResponseValidation.parse(res.data);
};
