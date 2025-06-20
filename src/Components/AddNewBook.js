import React, { useState } from "react";
import "./CssFile/PopupForm.css";

import { ToastContainer, toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

function AddNewBook({ supabase, fetchBooks, userId, lastBookNumber }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published_year: "",
    availability_status: "",
    number_of_copies: "",
  });

  const genres = [
    "Classic Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Non-Fiction",
    "Biography",
    "History",
    "Children's",
    "Others",
  ];

  const statusOptions = [
    "Available",
    "Checked Out",
    "On Hold",
    "Lost",
    "Being Repaired",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function insertBook(supabase, userId, formData) {
    const loading = toast.loading("Adding Book...");
    try {
      const { error } = await supabase.from("books").insert([
        {
          id: uuidv4(),
          title: formData.title,
          author: formData.author,
          user_id: userId,
          book_number: formData.book_number,
          genre: formData.genre,
          published_year: formData.published_year,
          availability_status: formData.availability_status,
          number_of_copies: formData.number_of_copies,
        },
      ]);
      toast.dismiss(loading);
      if (error) {
        toast.error("Failed to add book. Please try again");
      } else {
        toast.success("Book added successfully!");
        fetchBooks();
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add book. Please try again");
    }
  }

  const handleSubmit = (e) => {
    lastBookNumber++
    e.preventDefault();
    const processedData = {
      ...formData,
      book_number: parseInt(lastBookNumber),
      published_year: parseInt(formData.published_year),
      number_of_copies: parseInt(formData.number_of_copies),
    };
    insertBook(supabase, userId, processedData);
    clearForm();
  };

  function clearForm() {
    setFormData({
      title: "",
      author: "",
      genre: "",
      published_year: "",
      availability_status: "",
      number_of_copies: "",
    });
  }

  return (
    <div className="add-book-container">
      <ToastContainer position="top-center" />
      <h2 className="add-book-title">Add New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            className="form-input"
            type="number"
            name="published_year"
            placeholder="Published Year"
            value={formData.published_year}
            onChange={handleChange}
            required
            min="1800"
            max={new Date().getFullYear()}
          />

          <select
            className="form-input"
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            required
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <select
            className="form-input"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* <input
            className="form-input"
            type="number"
            name="number_of_copies"
            placeholder="Number of Copies"
            value={formData.number_of_copies}
            onChange={handleChange}
            required
          /> */}
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="p-3 mr-3 bg-orange-500 text-white rounded-md hover:bg-orange-400 transition"
            onClick={clearForm}
          >
            Clear Form
          </button>
          <button type="submit" className="bg-blue-500 submit-button">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBook;
