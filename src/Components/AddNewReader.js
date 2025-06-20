import React, { useState } from "react";
import "./CssFile/PopupForm.css";

import { ToastContainer, toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

function AddNewReader({ supabase, fetchProfiles, userId }) {
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    contact_number: "",
    email_address: "",
    address: "",
    id_proof: "",
    membership_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertReader(supabase, userId, formData);
      fetchProfiles();
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  async function insertReader(supabase, userId, formData) {
    const loading = toast.loading("Adding reader...");
    try {
      const { error } = await supabase.from("readers").insert([
        {
          id: uuidv4(),
          user_id: userId,
          full_name: formData.full_name,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
          contact_number: formData.contact_number,
          email_address: formData.email_address,
          address: formData.address,
          id_proof: formData.id_proof,
          membership_type: formData.membership_type,
        },
      ]);
      toast.dismiss(loading);

      if (error) {
        toast.error("Failed to add reader. Please try again.");
        throw error;
      } else {
        toast.success("Reader added successfully!");
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Failed to add reader. Please try again.");
    }
  }

  const clearForm = () => {
    setFormData({
      full_name: "",
      gender: "",
      date_of_birth: "",
      contact_number: "",
      email_address: "",
      address: "",
      id_proof: "",
      membership_type: "",
    });
  };

  return (
    <div className="add-book-container">
      <ToastContainer position="top-center" />
      <h2 className="add-book-title">Add New Reader</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
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
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="tel"
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            className="form-input"
            type="email"
            name="email_address"
            placeholder="Email Address"
            value={formData.email_address}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="id_proof"
            placeholder="ID Proof (e.g., PAN)"
            value={formData.id_proof}
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
            name="membership_type"
            value={formData.membership_type}
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
