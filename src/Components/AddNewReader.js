import React, { useState } from "react";
import "./CssFile/PopupForm.css"; 

function AddNewReader({ onAdd }) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    emailAddress: "",
    address: "",
    idProof: "",
    membershipType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      gender: "",
      dateOfBirth: "",
      contactNumber: "",
      emailAddress: "",
      address: "",
      idProof: "",
      membershipType: "",
    });
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">Add New Reader</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <select
            className="form-input"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <input
            className="form-input"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            className="form-input"
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="idProof"
            placeholder="ID Proof (e.g., PAN)"
            value={formData.idProof}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row single-column">
          <textarea
            className="form-input"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="form-row">
          <select
            className="form-input"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            required
          >
            <option value="">Membership Type</option>
            <option value="Public">Public</option>
            <option value="Institution">Institution</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="bg-yellow-500 clear-button mr-3"
            onClick={clearForm}
          >
            Clear
          </button>
           <button type="submit" className="bg-blue-500 submit-button">
            Add Reader
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewReader;
