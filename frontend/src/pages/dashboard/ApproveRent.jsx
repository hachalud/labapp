import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminApproveRent() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rentals");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/rentals/${id}`, { status });
      setMessage(`Request ${status}`);
      fetchRequests();
    } catch (err) {
      setMessage("Action failed");
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 pt-16 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Rental Requests (Admin)</h2>

      {message && <p className="text-green-600 mb-3">{message}</p>}

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((r) => (
          <div
            key={r.id}
            className="border p-4 rounded mb-3 flex justify-between items-center"
          >
            <div>
              <p><strong>User:</strong> {r.user}</p>
              <p><strong>Book:</strong> {r.book}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => updateStatus(r.id, "approved")}
                className="bg-[#010066] text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(r.id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
