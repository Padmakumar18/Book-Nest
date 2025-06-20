import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CssFile/Content.css";
import { ToastContainer, toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

function AddBookTaker({
  supabase,
  fetchBooks,
  book_takers,
  readers,
  books,
  fetchBookTakers,
  userId,
}) {
  const [formData, setFormData] = useState({
    reader_name: "",
    reader_id: "",
    book_title: "",
    book_id: "",
    from_date: "",
    return_date: "",
    book_number: "",
  });

  // console.log("books");
  // console.log(books);

  // console.log("readers");
  // console.log(readers);

  // console.log("book_takers");
  // console.log(book_takers);

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const updated = [...book_takers];
        updated[editIndex] = formData;

        // console.log("updated")
        // console.log(updated[editIndex].id)

        await alterBookTaker(updated[editIndex].id,book_takers[editIndex].book_id,formData.book_id);
        fetchBookTakers();
        setEditIndex(null);
      } else {
        await insertBookTaker();
        fetchBookTakers();
      }
      handleClear();
    } catch (error) {
      toast.error("Try again");
    }
  };

  async function insertBookTaker() {
    const loading = toast.loading("Adding reader...");
    try {
      const { error } = await supabase.from("book_takers").insert([
        {
          id: uuidv4(),
          book_title: formData.book_title,
          from_date: formData.from_date,
          user_id: userId,
          reader_id: formData.reader_id,
          book_id: formData.book_id,
          return_date: formData.return_date,
          reader_name: formData.reader_name,
          book_number: formData.book_number,
        },
      ]);

      const { error: updateError } = await supabase
        .from("books")
        .update({ availability_status: "Checked Out" })
        .eq("id", formData.book_id)
        .eq("user_id", userId);

        fetchBooks();

      toast.dismiss(loading);

      if (error || updateError) {
        console.error(error.message);
        toast.error("Failed to add. Please try again.");
        throw error;
      } else {
        toast.success("Successfully added!");
      }
    } catch (error) {
      console.error(error.message);
      toast.dismiss(loading);
      toast.error("Failed to add. Please try again.");
    }
  }

  async function alterBookTaker(row_id , availability_book_id,checked_out_book_id) {
    const loading = toast.loading("Adding reader...");
    console.log(availability_book_id)
    console.log(checked_out_book_id)
    try {
      const { error } = await supabase
        .from("book_takers")
        .update({
          book_title: formData.book_title,
          from_date: formData.from_date,
          user_id: userId,
          reader_id: formData.reader_id,
          book_id: formData.book_id,
          return_date: formData.return_date,
          reader_name: formData.reader_name,
          book_number: formData.book_number,
        })
        .eq("id", row_id);

        const { error1 } = await supabase
        .from("books")
        .update({ availability_status: "Checked Out" })
        .eq("id", checked_out_book_id)
        .eq("user_id", userId);

        const { error2 } = await supabase
        .from("books")
        .update({ availability_status: "Available" })
        .eq("id",availability_book_id)
        .eq("user_id", userId);

        fetchBooks();

      toast.dismiss(loading);
      if (error || error1 || error2 ) {
        console.error(error.message);
        console.error(error1.message);
        console.error(error2.message);
        toast.error("Failed to add. Please try again.");
        throw error;
      } else {
        toast.success("Successfully added!");
      }
    } catch (error) {
      console.error(error.message);
      toast.dismiss(loading);
      toast.error("Failed to add. Please try again.");
    }
  }

  const handleClear = () => {
    setFormData({
      reader_name: "",
      reader_id: "",
      book_title: "",
      book_id: "",
      from_date: "",
      return_date: "",
      book_number: "",
    });
    setEditIndex(null);
  };

  const handleDelete = async (index) => {
    const loading = toast.loading("Deleting reader...");

    try {
      const { error } = await supabase
        .from("book_takers")
        .delete()
        .eq("id", book_takers[index].id)
        .eq("user_id", userId);

        const { error: updateError } = await supabase
        .from("books")
        .update({ availability_status: "Available" })
        .eq("id", book_takers[index].book_id)
        .eq("user_id", userId);

        fetchBooks();

      if (error || updateError) {
        console.error(error.message);
        toast.error("Failed to delete. Please try again.");
        throw error;
      } else {
        fetchBookTakers();
      }

      toast.success("Successfully deleted!");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      toast.dismiss(loading);
    }
  };

  const handleEdit = (index) => {
    setFormData(book_takers[index]);
    setEditIndex(index);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-center">
            Reader Book Issue Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reader Name <span className="text-red-600">*</span>
              </label>
              <select
                name="reader_id"
                value={formData.reader_id}
                onChange={(e) => {
                  const reader_id = e.target.value;
                  const selectedReader = readers.find(
                    (r) => r.id === reader_id
                  );
                  setFormData((prev) => ({
                    ...prev,
                    reader_id,
                    reader_name: selectedReader?.full_name || "",
                  }));
                }}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a reader
                </option>
                {readers
                  .sort((a, b) => a.full_name.localeCompare(b.full_name))
                  .map((reader) => (
                    <option key={reader.id} value={reader.id}>
                      {reader.full_name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Name <span className="text-red-600">*</span>
              </label>
              <select
                name="book_id"
                value={formData.book_id}
                onChange={(e) => {
                  const book_id = e.target.value;
                  const selectedBook = books.find((b) => b.id === book_id);
                  setFormData((prev) => ({
                    ...prev,
                    book_id,
                    book_title: selectedBook?.title || "",
                    book_number: selectedBook?.book_number || "",
                  }));
                }}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a book
                </option>
                {books
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="from_date"
                value={formData.from_date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
                required
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
          {book_takers.length === 0 ? (
            <p className="text-gray-500 italic">No entries yet.</p>
          ) : (
            <div className="overflow-x-auto">
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
                  <AnimatePresence>
                    {book_takers.map((taker, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <motion.td
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="px-4 py-2 border"
                        >
                          {index + 1}
                        </motion.td>
                        <td className="px-4 py-2 border">
                          {taker.reader_name}
                        </td>
                        <td className="px-4 py-2 border">{taker.book_title}</td>
                        <td className="px-4 py-2 border">{taker.from_date}</td>
                        <td className="px-4 py-2 border">
                          {taker.return_date}
                        </td>
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
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddBookTaker;
