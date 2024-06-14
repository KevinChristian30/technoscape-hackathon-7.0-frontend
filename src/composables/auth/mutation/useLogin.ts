import {
  LoginPayload,
  loginPost,
  LoginResponse
} from "@/services/auth/login.get";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = () =>
  useMutation<LoginResponse, AxiosError<Error>, LoginPayload, unknown>({
    mutationFn: loginPost
  });
