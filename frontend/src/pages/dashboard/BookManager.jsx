import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const searchRef = useRef(null);
  const token = sessionStorage.getItem("token");

  // Fetch all books initially (optional)
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        setMessage("Error fetching books");
        setMessageType("error");
      }
    }
    fetchBooks();
  }, []);

  // Search handler
  const handleSearch = () => {
    setMessage("");
    setMessageType("");
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

  // Select book for editing
  const handleSelectBook = (book) => {
    setSelectedBook({ ...book });         //make a copy to edit
    setMessage("");
    setMessageType("");
  };

  // Update book handler
  const handleUpdate = async () => {
  if (!selectedBook) return;

  const payload = {
    title: selectedBook.title,
    Isbn: selectedBook.Isbn,
    quantity: selectedBook.quantity,
    author: selectedBook.author,
  };

  try {
    const res = await axios.put(
      `http://localhost:5000/api/books/${selectedBook.id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setMessage(res.data.message);
    setMessageType("success");

    const updatedBooks = books.map((b) =>
      b.id === selectedBook.id ? res.data.book : b
    );
    setBooks(updatedBooks);
    setResults(updatedBooks);
  } catch (err) {
    setMessage(err.response?.data?.message || "Error updating book");
    setMessageType("error");
  }
};


  const messageClasses = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <div className="flex flex-col items-center w-full p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Employee Book Manager</h2>

      {/* Search */}
      <div className="flex gap-3 w-full max-w-3xl">
        <input
          type="text"
          placeholder="Search by title or ISBN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
        >
          Search
        </button>
      </div>

      {message && (
        <p className={`text-sm ${messageClasses[messageType]}`}>{message}</p>
      )}

      {/* Search results */}
      {results.length > 0 && !selectedBook && (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-center">ISBN</th>
                <th className="border p-2 text-center">Available</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectBook(book)}
                >
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2 text-center">{book.Isbn}</td>
                  <td className="border p-2 text-center">{book.quantity}</td>
                  <td className="border p-2 text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected book edit form */}
      {selectedBook && (
        <div className="w-full max-w-2xl p-4 border rounded-lg shadow space-y-4">
          <h3 className="font-semibold text-lg text-center">Edit Book</h3>

          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              type="text"
              value={selectedBook.title}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, title: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>ISBN</label>
            <input
              type="text"
              value={selectedBook.Isbn}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, Isbn: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Quantity</label>
            <input
              type="number"
              min={0}
              value={selectedBook.quantity}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  quantity: Number(e.target.value),
                })
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Update Book
            </button>
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
