export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  isClient: boolean;
  isFreelancer: boolean;
}

export interface LoginResponse {
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  password: string;

  displayName: string;
  username: string;
}