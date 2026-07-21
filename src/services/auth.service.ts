import { LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from "@/models/auth";
import { api } from "./api";

export async function login(data: LoginRequest) {
  return api<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include"
  });
}

export async function me() {
  return api<MeResponse>("/api/auth/me", {
    method: "GET",
  });
}

export async function logout() {
  return api<{message: string}>("/api/auth/logout", {
    method: "POST",
  });
}

export async function register(data: RegisterRequest) {
  return api<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}