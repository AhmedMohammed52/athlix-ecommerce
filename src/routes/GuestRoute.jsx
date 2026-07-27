import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (user && !location.state?.from) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
