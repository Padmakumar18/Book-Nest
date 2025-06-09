import React from "react";
import { motion } from "framer-motion";
import "./BookList.css";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    genre: "Classic Fiction",
    publishedYear: 1925,
    availabilityStatus: "Available",
    coverImageUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    genre: "Classic Fiction",
    publishedYear: 1960,
    availabilityStatus: "Checked Out",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    genre: "Dystopian",
    publishedYear: 1949,
    availabilityStatus: "Available",
    coverImageUrl: "https://covers.openlibrary.org/b/id/153541-L.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780062315007",
    genre: "Adventure",
    publishedYear: 1988,
    availabilityStatus: "Available",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8108696-L.jpg",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    genre: "History",
    publishedYear: 2011,
    availabilityStatus: "Checked Out",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8774991-L.jpg",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    genre: "Young Adult",
    publishedYear: 1951,
    availabilityStatus: "Available",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8225631-L.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    genre: "Fantasy",
    publishedYear: 1937,
    availabilityStatus: "Available",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8108698-L.jpg",
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "9781524763138",
    genre: "Autobiography",
    publishedYear: 2018,
    availabilityStatus: "Checked Out",
    coverImageUrl: "https://covers.openlibrary.org/b/id/9253448-L.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    genre: "Self-help",
    publishedYear: 2018,
    availabilityStatus: "Available",
    coverImageUrl: "https://covers.openlibrary.org/b/id/9644266-L.jpg",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn: "9780399590504",
    genre: "Memoir",
    publishedYear: 2018,
    availabilityStatus: "Available",
    coverImageUrl: "",
  }
];

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
