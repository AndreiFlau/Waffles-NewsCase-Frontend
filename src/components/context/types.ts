import { Dispatch, SetStateAction } from "react";

interface User {
  id: number;
  email: string;
  createdAt: Date;
  admin: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export type { User, AuthContextType };
