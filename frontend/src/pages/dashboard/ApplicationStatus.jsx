import { useEffect, useState } from "react";
import axios from "axios";

function ApplicationStatus() {
  const [rentals, setRentals] = useState([]);
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchRentals() {
      const res = await axios.get(`http://localhost:5000/api/rentals/${user_id}`);
      setRentals(res.data);
    }
    fetchRentals();
  }, [user_id]);

  return (
    <div className="flex-1 overflow-auto p-6 pt-16 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Rental Application Status</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Book</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Requested At</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.book_title}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2">{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ApplicationStatus;
