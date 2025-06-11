import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CssFile/BookList.css";
import books from "../BooksList";

const BookList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="book-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")}>Clear</button>
      </div>

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <motion.div
              className="book-card-horizontal"
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* <img
                src={"/images/book_2436702.png"}
                alt={book.title}
                className="book-image"
                style={{
                  height:"50%",
                }}
              /> */}

              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Year:</strong> {book.publishedYear}</p>
                <p
                  className={
                    book.availabilityStatus === "Available"
                      ? "available"
                      : "checked-out"
                  }
                >
                  {book.availabilityStatus}
                </p>
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
