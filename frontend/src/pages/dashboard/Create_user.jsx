import { useState } from "react";
import axios from "axios";

export default function Create_user() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // default role
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = sessionStorage.getItem("token"); // JWT token from login

      const res = await axios.post(
        "http://localhost:5000/api/admin/create-user",
        { name, email, phone, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    <div className="p-6 bg-white shadow rounded-xl w-full max-w-md">
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
