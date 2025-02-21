import { Dispatch, SetStateAction } from "react";

interface User {
  id: number;
  email: string;
  createdAt: Date;
  admin: boolean;
}

interface UserData {
  streak: number;
  newsletterHistory: object;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  message: object;
}

interface UserContextType {
  userData: UserData | null;
  jwtToken: string;
  loading: boolean;
  message: object;
}

export type { User, AuthContextType, UserContextType, UserData };
