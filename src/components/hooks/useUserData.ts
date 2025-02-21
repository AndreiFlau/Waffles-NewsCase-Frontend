import { useContext } from "react";
import { UserContext } from "../context/getUserData.tsx";

function useUserData() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Contexto não disponível");
  }
  return context;
}

export default useUserData;
