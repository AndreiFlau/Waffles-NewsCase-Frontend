import { useContext } from "react";
import { AuthContext } from "../context/auth.tsx";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth tem que ser usado dentro de AuthProvider");
  }
  return context;
}

export default useAuth;
