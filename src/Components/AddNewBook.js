// Components/AddNewBook.js
import React, { useState } from "react";
import "./AddNewBook.css"; // Create this CSS file

function AddNewBook({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
    category: "",
    // Add other book fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="title">Add New Book</h2>
        <form onSubmit={handleSubmit} className="form">
          {/* Add your book form fields here */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {/* Add other fields similarly */}
          
          <div className="buttons">
            <button type="button" onClick={onClose} className="remainder">
              Cancel
            </button>
            <button type="submit" className="button">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewBook;