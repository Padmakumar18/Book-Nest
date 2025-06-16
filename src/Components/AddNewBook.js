import React, { useState } from "react";
import "./CssFile/PopupForm.css";

function AddNewBook({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    bookNumber: "",
    genre: "",
    publishedYear: "",
    availabilityStatus: "Available",
    numberOfCopies: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      bookNumber: parseInt(formData.bookNumber),
      publishedYear: parseInt(formData.publishedYear),
      numberOfCopies: parseInt(formData.numberOfCopies),
    };
    onAdd(processedData);
    setFormData({
      title: "",
      author: "",
      bookNumber: "",
      genre: "",
      publishedYear: "",
      availabilityStatus: "Available",
      numberOfCopies: "",
    });
  };

  return (
    <div className="add-book-container">
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
            name="bookNumber"
            placeholder="Book Number"
            value={formData.bookNumber}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="number"
            name="publishedYear"
            placeholder="Published Year"
            value={formData.publishedYear}
            onChange={handleChange}
            required
            min="1800"
            max={new Date().getFullYear()}
          />
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

          <input
            className="form-input"
            type="number"
            name="numberOfCopies"
            placeholder="Number of Copies"
            value={formData.numberOfCopies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <select
            className="form-input"
            name="availabilityStatus"
            value={formData.availabilityStatus}
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

        <div className="form-buttons">
          <button type="submit" className="bg-yellow-500 clear-button mr-3">
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
