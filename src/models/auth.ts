export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
    isClient: boolean;
    isFreelancer: boolean;
  };
}