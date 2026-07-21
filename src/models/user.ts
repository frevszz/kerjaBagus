import { Prisma, Profile, User } from "@/generated/prisma/client";

export interface UserProfile {
  id: string;

  displayName: string;
  username: string;

  avatar?: string | null;
}

export type GetUserResponse =
  Prisma.UserGetPayload<{
    include: {
      profile: true;
    };
  }>;

export interface UpdateUserRequest {
  email?: string;

  isClient?: boolean;
  isFreelancer?: boolean;
  isAdmin?: boolean;
}

export interface DeleteUserResponse {
  message: string;
}