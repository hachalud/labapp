import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ApplyRent() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");

  const user_id = sessionStorage.getItem("user_id");

  // 👇 ONLY search + results
  const searchRef = useRef(null);

  // Fetch books
  useEffect(() => {
    async function fetchBooks() {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data.filter((b) => b.quantity > 0));
    }
    fetchBooks();
  }, []);

  // 👇 Outside click reset (FIXED)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSearch("");
        setResults([]);
        setSelectedBook(null);
        setMessage("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setMessage("Please enter book title or ISBN");
      return;
    }

    setMessage("");
    setSelectedBook(null);

    const filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.isbn?.toLowerCase().includes(search.toLowerCase())
    );

    setResults(filtered);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setResults([]);
  };

  const handleRent = async () => {
    if (!selectedBook) {
      setMessage("Please select a book first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/rentals", {
        user_id,
        book_id: selectedBook.id,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error renting book");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Apply for Rent</h2>

      {/* 🔍 SEARCH AREA ONLY */}
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
          <p className="text-sm text-red-500 mb-3">{message}</p>
        )}

        {/* Results */}
        {results.map((book) => (
          <div
            key={book.id}
            onClick={() => handleSelectBook(book)}
            className="border p-3 rounded cursor-pointer hover:bg-gray-50 mb-2"
          >
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm">ISBN: {book.isbn}</p>
            <p className="text-sm">Available: {book.quantity}</p>
          </div>
        ))}
      </div>

      {/* ✅ SELECTED BOOK (OUTSIDE CLICK AREA) */}
      {selectedBook && (
        <div className="mt-4 p-4 border-2 border-green-600 rounded bg-green-50">
          <p className="font-semibold">{selectedBook.title}</p>
          <p className="text-sm">ISBN: {selectedBook.isbn}</p>
          <p className="text-sm">
            Available: {selectedBook.quantity}
          </p>
        </div>
      )}

      {/* Submit */}
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
