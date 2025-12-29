import { useState, useEffect } from "react";
import axios from "axios";

export default function ReturnBook() {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error" | "warning" | "info"

  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchRentals() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rentals/${user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const activeRentals = res.data.filter((r) => r.status === "approved");
        setRentals(activeRentals);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch rentals");
        setMessageType("error");
      }
    }
    fetchRentals();
  }, [user_id, token]);

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!selectedRental) {
      setMessage("Please select a book to return");
      setMessageType("warning");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/rentals/return",
        { rental_id: selectedRental },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Book returned successfully");
      setMessageType("success");

      // Remove returned book from dropdown
      setRentals(rentals.filter((r) => r.id !== selectedRental));
      setSelectedRental("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error returning book");
      setMessageType("error");
    }
  };

  // Map message types to Tailwind classes
  const messageClasses = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Return Book</h2>

      {message && (
        <p className={`text-center text-sm mb-4 ${messageClasses[messageType]}`}>
          {message}
        </p>
      )}

      {rentals.length === 0 ? (
        <p className="text-center">You have no books to return.</p>
      ) : (
        <form onSubmit={handleReturn} className="flex flex-col gap-3">
          <select
            value={selectedRental}
            onChange={(e) => setSelectedRental(e.target.value)}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Book to Return</option>
            {rentals.map((r) => (
              <option key={r.id} value={r.id}>
                {r.book_title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded mt-2 disabled:opacity-50"
            disabled={!selectedRental}
          >
            Submit Return
          </button>
        </form>
      )}
    </div>
  );
}
