import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ FRONTEND VALIDATION
  const validate = () => {
    // Name: starts with capital letter
    // const nameRegex = /^[A-Z][a-zA-Z]*$/;
    // if (!nameRegex.test(name)) {
    //   return "Name must start with a capital letter and contain only letters";
    // }

    // Phone: starts with 09 and 10 digits
    const phoneRegex = /^(09|07)\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone must start with 09 or 07 and be 10 digits";
    }

    // Email: gmail.com OR .et OR .gov
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*[a-zA-Z0-9]+@(gmail\.com|.+\.et|.+\.gov)$/;
    if (!emailRegex.test(email)) {
      return "Email must be gmail.com, .et, or .gov";
    }

    const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    return "Password must be at least 6 characters and include a letter, number, and special character";
  }

    // Password match
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    // ✅ run validation FIRST
    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          phone,
          email,
          password,
        }
      );

      setMessage(res.data.message || "Signup successful");
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Customer Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />

          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded-xl"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
