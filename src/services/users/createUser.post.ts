import http from "@/lib/axios";

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
}

export const createUserPost = async (
  payload: CreateUserPayload,
): Promise<void> => {
  await http.post<void>("user", payload);
};
