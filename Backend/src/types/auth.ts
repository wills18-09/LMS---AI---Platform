export type UserRole = "student" | "instructor" | "admin";

export interface JwtPayload {
  id: string;
  role: UserRole;
}