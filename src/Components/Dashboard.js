import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const mockReaders = [
    {
      fullName: "Ananya Sharma",
      gender: "Female",
      dateOfBirth: "2001-09-15",
      contactNumber: "+91 9876543210",
      emailAddress: "ananya.sharma@example.com",
      address: "123, MG Road, Coimbatore, Tamil Nadu, 641001",
      idProof: "Aadhaar - 1234 5678 9012",
      membershipType: "Student",
      institution: "VSB College of Engineering",
    },
    {
      fullName: "Rohan Mehta",
      gender: "Male",
      dateOfBirth: "1998-03-22",
      contactNumber: "+91 9123456780",
      emailAddress: "rohan.mehta@example.com",
      address: "45, Park Street, Bengaluru, Karnataka, 560001",
      idProof: "PAN - ABLPM1234C",
      membershipType: "Public",
      institution: "",
    },
    {
      fullName: "Sneha Iyer",
      gender: "Female",
      dateOfBirth: "2000-07-09",
      contactNumber: "+91 9988776655",
      emailAddress: "sneha.iyer@example.com",
      address: "78, Anna Nagar, Chennai, Tamil Nadu, 600040",
      idProof: "Aadhaar - 5678 9012 3456",
      membershipType: "Student",
      institution: "SRM University",
    },
    {
      fullName: "Arjun Reddy",
      gender: "Male",
      dateOfBirth: "1997-12-05",
      contactNumber: "+91 9001122334",
      emailAddress: "arjun.reddy@example.com",
      address: "21, Banjara Hills, Hyderabad, Telangana, 500034",
      idProof: "PAN - BNZPA1234D",
      membershipType: "Staff",
      institution: "Hyderabad Public Library",
    },
    {
      fullName: "Nivedita Menon",
      gender: "Female",
      dateOfBirth: "2002-04-18",
      contactNumber: "+91 8877665544",
      emailAddress: "nivedita.menon@example.com",
      address: "32, Civil Lines, Delhi, 110054",
      idProof: "Aadhaar - 2345 6789 0123",
      membershipType: "Student",
      institution: "Delhi University",
    },
    {
      fullName: "Siddharth Kapoor",
      gender: "Male",
      dateOfBirth: "1995-06-30",
      contactNumber: "+91 9765432109",
      emailAddress: "sid.kapoor@example.com",
      address: "15, MG Road, Pune, Maharashtra, 411001",
      idProof: "Aadhaar - 6789 0123 4567",
      membershipType: "Public",
      institution: "",
    },
    {
      fullName: "Divya Joshi",
      gender: "Female",
      dateOfBirth: "1999-11-02",
      contactNumber: "+91 9012345678",
      emailAddress: "divya.joshi@example.com",
      address: "56, Palayam, Thiruvananthapuram, Kerala, 695001",
      idProof: "PAN - CJHPJ5678K",
      membershipType: "Staff",
      institution: "Kerala State Library",
    },
    {
      fullName: "Aarav Patel",
      gender: "Male",
      dateOfBirth: "2003-01-25",
      contactNumber: "+91 9345678901",
      emailAddress: "aarav.patel@example.com",
      address: "89, CG Road, Ahmedabad, Gujarat, 380009",
      idProof: "Aadhaar - 7890 1234 5678",
      membershipType: "Student",
      institution: "Nirma University",
    },
    {
      fullName: "Meera Nair",
      gender: "Female",
      dateOfBirth: "1996-10-12",
      contactNumber: "+91 9500123456",
      emailAddress: "meera.nair@example.com",
      address: "101, Gandhi Road, Madurai, Tamil Nadu, 625001",
      idProof: "Aadhaar - 8901 2345 6789",
      membershipType: "Public",
      institution: "",
    },
    {
      fullName: "Karthik Raj",
      gender: "Male",
      dateOfBirth: "1994-08-08",
      contactNumber: "+91 9090909090",
      emailAddress: "karthik.raj@example.com",
      address: "67, JP Nagar, Mysuru, Karnataka, 570008",
      idProof: "PAN - FGTRK1234L",
      membershipType: "Staff",
      institution: "Mysore Central Library",
    },
  ];

   const [formData, setFormData] = useState({
    readerName: "",
    date: "",
    bookName: "",
    days: "",
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
    setFormData({ readerName: "", date: "", bookName: "", days: "" });
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
      <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="buttons mb-6">
        <button className="button">View all books</button>
        <button className="button">+ Add new reader</button>
        <button className="button">+ Add new book</button>
        <button className="button">Search profile</button>
        <p className="button">Books to collect: 10+</p>
      </div>

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
                <option value="" disabled>
                  Select a reader
                </option>
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
                Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                Book Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
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
            </div>

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
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Days</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookTakers.map((taker, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{taker.readerName}</td>
                    <td className="px-4 py-2 border">{taker.bookName}</td>
                    <td className="px-4 py-2 border">{taker.date}</td>
                    <td className="px-4 py-2 border">{taker.days}</td>
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

export default Dashboard;
