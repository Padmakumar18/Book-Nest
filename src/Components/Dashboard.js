import React, { useState } from "react";

function Dashboard() {
  const [formData, setFormData] = useState({
    readerName: "",
    date: "",
    bookName: "",
    days: "",
  });

  const [bookTakers, setBookTakers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookTakers([...bookTakers, formData]);
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      readerName: "",
      date: "",
      bookName: "",
      days: "",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition">
          View all books
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-500 transition">
          + Add new reader
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-500 transition">
          + Add new book
        </button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-500 transition">
          Search profile
        </button>
        <p className="bg-red-500 text-white px-4 py-2 rounded-md shadow">
          Books to collect: 10+
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-center">
            Reader Book Issue Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["readerName", "date", "bookName", "days"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field === "days" ? "Number of Days" : field.replace(/([A-Z])/g, " $1")}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type={field === "date" ? "date" : field === "days" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  min={field === "days" ? 1 : undefined}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

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
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow overflow-y-auto max-h-[32rem]">
          <h3 className="text-lg font-semibold mb-4">Book Takers List</h3>
          {bookTakers.length === 0 ? (
            <p className="text-gray-500 italic">No entries yet.</p>
          ) : (
            <ul className="list-disc list-inside text-sm space-y-2">
              {bookTakers.map((taker, index) => (
                <li key={index}>
                  <span className="font-medium">{taker.readerName}</span> took{" "}
                  <span className="italic">{taker.bookName}</span> on{" "}
                  <span>{taker.date}</span> for <span>{taker.days}</span> day(s).
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
