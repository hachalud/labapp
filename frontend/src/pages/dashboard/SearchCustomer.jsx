import { useState } from "react";
import axios from "axios";

export default function SearchCustomer() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage("Enter name, email or phone");
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/customers/search",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { q: query },
        }
      );

      setCustomers(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Search failed");
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 pt-16 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Search Customer
      </h2>

      {/* Single search input */}
      <input
        type="text"
        placeholder="Search by name, email or phone"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Search
      </button>

      {message && (
        <p className="text-center text-red-500 mt-3">{message}</p>
      )}

      {/* Results */}
      {customers.length > 0 && (
        <table className="w-full mt-5 border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {customers.length === 0 && !message && (
        <p className="text-center mt-4 text-gray-500">
          No customers found
        </p>
      )}
    </div>
  );
}
