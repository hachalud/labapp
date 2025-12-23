import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      const { user_id, role, token, message: serverMessage } = res.data;

      // Basic validation
      if (!user_id || !role) {
        setMessage("Invalid server response");
        setLoading(false);
        return;
      }

      // Save auth data
      sessionStorage.setItem("user_id", user_id);
      sessionStorage.setItem("role", role);
      if (token) sessionStorage.setItem("token", token);

      setMessage(serverMessage || "Login successful");

      // IMPORTANT:
      // Login does NOT decide pages
      // Dashboard + ProtectedRoute will handle access
      navigate("/dashboard");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid login credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[380px] bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        
        <h2 className="text-2xl font-bold text-center">
          Book Rental System Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Username / Email</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-xl"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-xl"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-xl text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-2">
            New user?{" "}
            <span
              className="text-green-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
