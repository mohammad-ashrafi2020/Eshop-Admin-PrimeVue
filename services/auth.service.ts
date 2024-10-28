import type { LoginData } from "~/models/auth/LoginData";
import { CustomFetch } from "~/utils/CustomFetch";

export const Login = (phoneNumber: string, password: string) => {
  return CustomFetch<LoginData>("/auth/login", {
    method: "POST",
    body: {
      phoneNumber,
      password,
    },
  });
};
