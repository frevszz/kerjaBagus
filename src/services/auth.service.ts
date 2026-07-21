import { LoginRequest, LoginResponse } from "@/models/auth";
import { api } from "./api";

export async function login(data: LoginRequest) {
  return api<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}