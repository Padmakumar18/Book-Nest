import React from "react";
import { motion } from "framer-motion";
import "./BookList.css";
import books from "../BooksList";

const BookList = () => {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <motion.div
          className="book-card-horizontal"
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <img
            src={book.coverImageUrl || "/images/book_2436702.png"}
            alt={book.title}
            className="book-image"
            style={{
              height: book.coverImageUrl ? "100%" : "60%",
            }}
          />

          <div className="book-info">
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Year:</strong> {book.publishedYear}
            </p>
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
      ))}
    </div>
  );
};

export default BookList;
