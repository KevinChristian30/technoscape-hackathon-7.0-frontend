import {
  LoginPayload,
  loginPost,
  LoginResponse,
} from "@/services/auth/login.post";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = () =>
  useMutation<LoginResponse, AxiosError<any>, LoginPayload, unknown>({
    mutationFn: loginPost,
  });
