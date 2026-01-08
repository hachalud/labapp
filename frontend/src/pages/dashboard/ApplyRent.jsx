import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ApplyRent() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const searchRef = useRef(null);
  const token = sessionStorage.getItem("token");

  // Fetch books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data.filter((b) => b.quantity > 0));
      } catch (err) {
        setMessage("Error fetching books");
        setMessageType("error");
      }
    }
    fetchBooks();
  }, []);

  // Handle outside click
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (searchRef.current && !searchRef.current.contains(e.target)) {
  //       setSearch("");
  //       setResults([]);
  //       setMessage("");
  //       setMessageType("");
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // Search handler
  const handleSearch = () => {
    setMessage("");
    setMessageType("");
    setCurrentPage(1);

    if (!search.trim()) {
      setResults(books);
      return;
    }

    const filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.Isbn && b.Isbn.toLowerCase().includes(search.toLowerCase()))
    );

    if (filtered.length === 0) {
      setMessage("No books found");
      setMessageType("info");
    }

    setResults(filtered);
  };

  // Rent handler
  const handleRent = async (book) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/rentals",
      { book_id: book.id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessage(res.data.message || "Rental request submitted successfully");
    setMessageType("success");
  } catch (err) {
    setMessage(err.response?.data?.message || "Error submitting rental");
    setMessageType("error");
  }
};


  // Pagination
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedBooks = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const messageClasses = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <div className="flex-1 overflow-auto p-6 w-full mx-auto ">
      <h2 className="text-xl text-center font-bold mb-4">Apply for Rent</h2>

      {/* Search */}
      <div ref={searchRef} className="mb-4 max-w-xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title or ISBN"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border max-w-xl mx-auto border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Search
          </button>
        </div>

        {message && (
          <p className={`text-sm mt-2 ${messageClasses[messageType]}`}>
            {message}
          </p>
        )}
      </div>

      {/* Table */}
      {paginatedBooks.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2">ISBN</th>
                <th className="border p-2">quantity</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2 text-center">{book.Isbn}</td>
                  <td className="border p-2 text-center">{book.quantity}</td>
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRent(book)}
                      disabled={book.quantity === 0}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                    >
                      Submit Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
