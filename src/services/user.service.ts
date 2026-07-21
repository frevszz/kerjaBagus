import { api } from "./api";
import {
  GetUserResponse,
  UpdateUserRequest,
  DeleteUserResponse,
} from "@/models/user";

/**
 * GET /api/users/:id
 */
export async function getUser(id: string) {
  return api<GetUserResponse>(`/api/users/${id}`);
}

/**
 * PATCH /api/users/:id
 */
export async function updateUser(
  id: string,
  body: UpdateUserRequest
) {
  return api<GetUserResponse>(`/api/users/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });
}

/**
 * DELETE /api/users/:id
 */
export async function deleteUser(id: string) {
  return api<DeleteUserResponse>(`/api/users/${id}`, {
    method: "DELETE",
  });
}