import {
  CreateUserPayload,
  createUserPost,
} from "@/services/users/createUserPost";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateUser = () =>
  useMutation<void, AxiosError<Error>, CreateUserPayload, unknown>({
    mutationFn: createUserPost,
  });
