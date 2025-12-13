
export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  DEALER = 'DEALER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
}

export interface UserPayload {
  sub: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
} 