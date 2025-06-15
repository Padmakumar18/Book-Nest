import React, { useState } from "react";
import "./CssFile/PopupForm.css";

function AddNewBook({ onClose, onAdd }) {
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
    };
    onAdd(processedData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">Add New Book</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <input
            className="popup-input"
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className="popup-input"
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <select
            className="popup-select"
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
            className="popup-input"
            type="number"
            name="publishedYear"
            placeholder="Published Year"
            value={formData.publishedYear}
            onChange={handleChange}
            required
            min="1800"
            max={new Date().getFullYear()}
          />
          <input
            className="popup-input"
            type="number"
            name="Number of copies"
            placeholder="Number of copies"
            value={formData.numberOfCopies}
            onChange={handleChange}
            required
          />
          <select
            className="popup-select"
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
          {/* <input
            className="popup-input"
            type="url"
            name="coverImageUrl"
            placeholder="Cover Image URL"
            value={formData.coverImageUrl}
            onChange={handleChange}
            required
          />
          {formData.coverImageUrl && (
            <div className="image-preview">
              <img
                src={formData.coverImageUrl}
                alt="Cover Preview"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/100x150?text=No+Cover")
                }
              />
            </div>
          )} */}

          <div className="popup-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewBook;
