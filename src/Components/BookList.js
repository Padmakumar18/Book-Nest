import React, { useState } from "react";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./CssFile/BookList.css";

import { ToastContainer, toast } from "react-toastify";

const BookList = ({ supabase, books, userId, fetchBooks, fetchBookTakers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingBookId, setDeletingBookId] = useState(null);

  // console.log("books");
  // console.log(books);

  const filteredBooks = books
    ?.slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDelete = async (bookId, bookNumber) => {
    const loading = toast.loading("Deleting Book...");
    setDeletingBookId(bookId);

    try {
      const { error } = await supabase
        .from("books")
        .delete()
        .eq("id", bookId)
        .eq("user_id", userId);

      const { error: err } = await supabase
        .from("book_takers")
        .delete()
        .eq("book_id", bookId)
        .eq("user_id", userId);

      if (error || err) {
        console.error(error || err);
        toast.error("Failed to delete the book. Please try again.");
      } else {
        toast.success("Book deleted!");
        fetchBooks();
        fetchBookTakers();
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")}>Clear</button>
      </div>

      <div className="list">
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <motion.div
              className="card"
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="card-content">
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                  <strong>Book No:</strong> {book.book_number}
                </p>
                <p>
                  <strong>Year:</strong> {book.published_year}
                </p>
                <p>
                  <strong>Copies:</strong> {book.number_of_copies || 0}
                </p>
                <p
                  className={`availability ${
                    book.availability_status === "Available"
                      ? "available"
                      : "unavailable"
                  }`}
                >
                  {book.availability_status}
                </p>
              </div>

              <div className="delete-button-container">
                <IconButton
                  onClick={() => handleDelete(book.id, book.book_number)}
                  size="small"
                  color="error"
                  disabled={deletingBookId === book.id}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="no-results">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
