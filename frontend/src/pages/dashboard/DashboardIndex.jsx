import { Navigate } from "react-router-dom";

export default function DashboardIndex() {
  const role = sessionStorage.getItem("role");

  if (role === "customer") return <Navigate to="search-book" replace />;
  if (role === "employee") return <Navigate to="search-book" replace />;
  if (role === "admin") return <Navigate to="approve-add-book" replace />;

  return <Navigate to="/login" replace />;
}
