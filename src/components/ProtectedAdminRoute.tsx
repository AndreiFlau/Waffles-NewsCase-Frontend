import { Navigate, Outlet } from "react-router";
import useAuth from "./hooks/useAuth";

export function ProtectedAdminRoute() {
  const { user } = useAuth();

  return user?.admin ? <Outlet /> : <Navigate to="/user" />;
}
