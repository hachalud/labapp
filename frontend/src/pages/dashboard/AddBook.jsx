import { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [Isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = sessionStorage.getItem("token"); // JWT token from login

      const res = await axios.post(
        "http://localhost:5000/api/books",
        { title, author, Isbn, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Book added successfully");

      // Clear form
      setTitle("");
      setAuthor("");
      setIsbn("");
      setQuantity(1);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding book");
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 pt-16 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Add New Book</h2>

      {message && (
        <p className="text-center text-sm text-green-500 mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />
        <input
          type="text"
          placeholder="Isbn"
          value={Isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="p-2 border rounded-xl"
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-2 border rounded-xl"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-xl mt-2"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
