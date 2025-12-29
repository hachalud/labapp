import { useState } from "react";
import axios from "axios";

export default function ApproveAddBook() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState("");

  const token = sessionStorage.getItem("token");

  const searchBooks = async () => {
    if (!q.trim()) {
      setMsg("Type title, author, or ISBN");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/books/search?q=${q}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(res.data);
      setMsg(res.data.length === 0 ? "No books found" : "");
    } catch (err) {
      console.error(err);
      setMsg("Search failed");
    }
  };

  const deleteBook = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/books/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(books.filter(b => b.id !== id));
      setMsg("Book deleted");
    } catch (err) {
      setMsg(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 pt-16 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Delete Book</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, author, or ISBN"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {msg && <p className="mb-4 text-red-500">{msg}</p>}

      <div className="flex flex-col gap-4">
        {books.map(book => (
          <div
            key={book.id}
            className="border-b border-gray-300 pb-2"
          >
            <p className="font-semibold">{book.title} – {book.author}</p>
            <p>ISBN: {book.Isbn}</p>
            <p>Stock: {book.quantity}</p>
            <button
              onClick={() => deleteBook(book.id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
