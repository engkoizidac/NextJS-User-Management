export interface User {
  id: string;
  fullName: string;
  username: string;
  password?: string; // Optional if you're excluding it from responses
  status?: "Activated" | "Deactivated";
  createdAt?: Date;
  updatedAt?: Date;
}
