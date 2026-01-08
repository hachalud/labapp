import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const role = sessionStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <div className="p-6 text-red-600">Access Denied</div>;
  }

  return children;
}
export default ProtectedRoute;