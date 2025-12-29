import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ApplyRent() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error | warning | info

  const searchRef = useRef(null);
  const token = sessionStorage.getItem("token");

  // Fetch all available books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data.filter((b) => b.quantity > 0));
      } catch (err) {
        console.error(err);
        setMessage("Error fetching books");
        setMessageType("error");
      }
    }
    fetchBooks();
  }, []);

  // Click outside search/results resets search/results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearch("");
        setResults([]);
        setMessage("");
        setMessageType("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setMessage("Please enter book title or ISBN");
      setMessageType("warning");
      return;
    }
    setMessage("");
    setMessageType("");
    setSelectedBook(null);

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

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setResults([]);
    setMessage("");
    setMessageType("");
  };

  const handleRent = async () => {
    if (!selectedBook) {
      setMessage("Please select a book first");
      setMessageType("warning");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/rentals",
        { book_id: selectedBook.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Rental request submitted successfully");
      setMessageType("success");
      setSelectedBook(null);
      setSearch("");
      setResults([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting rental");
      setMessageType("error");
    }
  };

  // Map message type to Tailwind classes
  const messageClasses = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <div className="flex-1 overflow-auto p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Apply for Rent</h2>

      {/* Search Input + Results */}
      <div ref={searchRef}>
        <input
          type="text"
          placeholder="Search by title or ISBN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-3"
        >
          Search Book
        </button>

        {message && (
          <p className={`text-sm mb-3 ${messageClasses[messageType]}`}>
            {message}
          </p>
        )}

        {results.map((book) => (
          <div
            key={book.id}
            onClick={() => handleSelectBook(book)}
            className="border p-3 rounded cursor-pointer hover:bg-gray-50 mb-2"
          >
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm">ISBN: {book.Isbn}</p>
            <p className="text-sm">Available: {book.quantity}</p>
          </div>
        ))}
      </div>

      {/* Selected Book */}
      {selectedBook && (
        <div className="mt-4 p-4 border-2 border-green-600 rounded bg-green-50">
          <p className="font-semibold">{selectedBook.title}</p>
          <p className="text-sm">ISBN: {selectedBook.Isbn}</p>
          <p className="text-sm">Available: {selectedBook.quantity}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleRent}
        disabled={!selectedBook}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 disabled:opacity-50"
      >
        Submit Rental Request
      </button>
    </div>
  );
}
