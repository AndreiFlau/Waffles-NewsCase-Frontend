import { Dispatch, SetStateAction } from "react";

interface User {
  id: number;
  email: string;
  createdAt: Date;
  admin: boolean;
}

interface UserData {
  streak: object;
  newsletterHistory: object;
}

interface Message {
  message: string;
  success: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (email: string) => Promise<void> | null;
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

export type { User, AuthContextType, UserContextType, UserData, Message };
