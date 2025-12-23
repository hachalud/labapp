import { useState, useEffect } from "react";
import axios from "axios";

export default function ReturnBook() {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState("");
  const [message, setMessage] = useState("");

  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchRentals() {
      try {
        const res = await axios.get(`http://localhost:5000/api/rentals/${user_id}`);
        // Only show books currently rented (APPROVED)
        const activeRentals = res.data.filter(r => r.status === "APPROVED");
        setRentals(activeRentals);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRentals();
  }, [user_id]);

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!selectedRental) {
      setMessage("Please select a book to return");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/rentals/return", {
        rental_id: selectedRental,
      });
      setMessage(res.data.message || "Book returned successfully");

      // Remove the returned book from dropdown
      setRentals(rentals.filter(r => r.id !== selectedRental));
      setSelectedRental("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error returning book");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Return Book</h2>

      {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}

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
            className="bg-red-600 text-white p-2 rounded mt-2"
          >
            Submit Return
          </button>
        </form>
      )}
    </div>
  );
}
