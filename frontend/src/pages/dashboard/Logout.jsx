import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    sessionStorage.clear();

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
