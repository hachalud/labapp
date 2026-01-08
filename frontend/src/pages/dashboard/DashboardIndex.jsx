import { Navigate } from "react-router-dom";

export default function DashboardIndex() {
  const role = sessionStorage.getItem("role");

  if (role === "customer") return <Navigate to="apply-rent" replace />;
  if (role === "employee") return <Navigate to="book-manager" replace />;
  if (role === "admin") return <Navigate to="approve-rent" replace />;

  return <Navigate to="/login" replace />;
}
