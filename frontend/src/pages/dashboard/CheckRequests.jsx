import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckRequests() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/employee/not-returned",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        Books Not Yet Returned
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {data.length === 0 ? (
        <p className="text-center">All books are returned.</p>
      ) : (
       <div className="overflow-x-auto">
  <table className="w-full border-collapse hidden md:table">
    <thead>
      <tr className="border-b bg-gray-100">
        <th className="p-2 text-left">Book</th>
        <th className="p-2 text-left">Author</th>
        <th className="p-2 text-left">ISBN</th>
        <th className="p-2 text-left">Customer</th>
        <th className="p-2 text-left">Email</th>
      </tr>
    </thead>
    <tbody>
      {data.map((r) => (
        <tr key={r.rental_id} className="border-b">
          <td className="p-2">{r.title}</td>
          <td className="p-2">{r.author}</td>
          <td className="p-2">{r.Isbn}</td>
          <td className="p-2">{r.customer_name}</td>
          <td className="p-2">{r.customer_email}</td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mobile Cards */}
  <div className="md:hidden space-y-4">
    {data.map((r) => (
      <div
        key={r.rental_id}
        className="border rounded-lg p-4 shadow-sm bg-white"
      >
        <div className="flex justify-between">
          <span className="font-semibold">Book:</span>
          <span>{r.title}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Author:</span>
          <span>{r.author}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">ISBN:</span>
          <span>{r.Isbn}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Customer:</span>
          <span>{r.customer_name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span className="break-all">{r.customer_email}</span>
        </div>
      </div>
    ))}
  </div>
</div>

      )}
    </div>
  );
}
