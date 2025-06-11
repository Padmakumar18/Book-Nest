import React, { useState } from "react";
import "./CssFile/AddNewReader.css";

function AddNewReader({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    emailAddress: "",
    address: "",
    idProof: "",
    membershipType: "",
    institution: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="title">Add New Reader</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <select
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
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            required
          />
          <input
            type="text"
            name="idProof"
            placeholder="ID Proof (e.g., PAN)"
            value={formData.idProof}
            onChange={handleChange}
            required
          />
          <select
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
          <input
            type="text"
            name="institution"
            placeholder="Institution (optional)"
            value={formData.institution}
            onChange={handleChange}
          />

          <div className="buttons">
            <button type="button" onClick={onClose} className="remainder">
              Cancel
            </button>
            <button type="submit" className="button">
              Add Reader
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewReader;
