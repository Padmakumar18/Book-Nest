import React, { useState } from "react";
import "./CssFile/Content.css";
import mockReaders from "../Profiles";
import books from "../BooksList";

function Content() {
  const [formData, setFormData] = useState({
    readerName: "",
    bookName: "",
    from_date: "",
    last_date: "",
  });

  const [bookTakers, setBookTakers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...bookTakers];
      updated[editIndex] = formData;
      setBookTakers(updated); 
      setEditIndex(null);
    } else {
      setBookTakers([...bookTakers, formData]);
    }
    handleClear();
  };

  const handleClear = () => {
    setFormData({ readerName: "", from_date: "", bookName: "", last_date: "" });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = bookTakers.filter((_, i) => i !== index);
    setBookTakers(updated);
  };

  const handleEdit = (index) => {
    setFormData(bookTakers[index]);
    setEditIndex(index);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-center">
              Reader Book Issue Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  Reader Name <span className="text-red-600">*</span>
                </label>
                <select
                  name="readerName"
                  value={formData.readerName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a reader</option>
                  {mockReaders
                    .sort((a, b) => a.fullName.localeCompare(b.fullName))
                    .map((reader, idx) => (
                      <option key={idx} value={reader.fullName}>
                        {reader.fullName}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  Book Name <span className="text-red-600">*</span>
                </label>
                <select
                  name="bookName"
                  value={formData.bookName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a book</option>
                  {books
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((book, idx) => (
                      <option key={book.bookNumber} value={book.title}>
                        {book.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  From Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.from_date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  Last Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.last_date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  Number of Days <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full sm:w-1/2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-400 transition"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                >
                  {editIndex !== null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow overflow-auto max-h-[32rem]">
            <h3 className="text-lg font-semibold mb-4">Book Takers List</h3>
            {bookTakers.length === 0 ? (
              <p className="text-gray-500 italic">No entries yet.</p>
            ) : (
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="px-4 py-2 border">#</th>
                    <th className="px-4 py-2 border">Reader Name</th>
                    <th className="px-4 py-2 border">Book Name</th>
                    <th className="px-4 py-2 border">From Date</th>
                    <th className="px-4 py-2 border">Last Date</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookTakers.map((taker, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{taker.readerName}</td>
                      <td className="px-4 py-2 border">{taker.bookName}</td>
                      <td className="px-4 py-2 border">{taker.from_date}</td>
                      <td className="px-4 py-2 border">{taker.last_date}</td>
                      <td className="px-4 py-2 border flex gap-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
    </div>
  );
}

export default Content;
