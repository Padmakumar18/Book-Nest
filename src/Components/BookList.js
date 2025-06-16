import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./CssFile/BookList.css";
// import books from "../BooksList";

const BookList = ({ supabase, books }) => {
  const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = books
    ?.slice() 
    .sort((a, b) => a.title.localeCompare(b.title)) 
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );


  return (
    <div className="container">
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
              className="card-horizontal"
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={"/images/book_2436702.png"}
                alt={book.title}
                className="card-image"
              />
              <div className="card-info">
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
                  <strong>Number of copies:</strong> {book.number_of_copies}
                </p>
                <p
                  className={`font-bold ${
                    book.availabilityStatus === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
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
