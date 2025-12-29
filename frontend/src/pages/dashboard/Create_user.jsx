import { useState } from "react";
import axios from "axios";

export default function Create_user() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    // Name: starts with capital letter
    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    if (!nameRegex.test(name)) return "Name must start with a capital letter";

    // Email: gmail.com OR .et OR .gov
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.+\.et|.+\.gov)$/;
    if (!emailRegex.test(email)) return "Email must end with @gmail.com, .et, or .gov";

    // Phone: starts with 09 and 10 digits
    const phoneRegex = /^09\d{8}$/;
    if (!phoneRegex.test(phone)) return "Phone must start with 09 and be 10 digits";

    // Password: min 6 characters, at least one letter, number, and special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password))
      return "Password must be at least 6 characters and include a letter, number, and special character";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      const token = sessionStorage.getItem("token"); // JWT token from login

      const res = await axios.post(
        "http://localhost:5000/api/admin/create-user",
        { name, email, phone, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("employee");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 pt-16 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Create User</h2>

      {message && (
        <p className="text-center text-sm text-red-500 mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded-xl"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-xl mt-2"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
