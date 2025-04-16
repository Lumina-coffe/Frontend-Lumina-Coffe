import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedAdminRoute;
