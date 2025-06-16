import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { needToCollect } from "../NeedToCollect";

const BooksToCollectList = ({ supabase, book_takers }) => {
  const [bookTakers, setBookTakers] = useState(book_takers || []);
  // useEffect(() => {
  //   console.log("bookTakers");
  //   console.log(bookTakers);
  // }, [bookTakers]);
  const handleDelete = (index) => {
    const updatedList = [...bookTakers];
    updatedList.splice(index, 1);
    setBookTakers(updatedList);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-auto max-h-[32rem]">
      <h3 className="text-lg font-semibold mb-4">Book Takers List</h3>
      {bookTakers.length === 0 ? (
        <p className="text-gray-500 italic">No entries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Reader Name</th>
                <th className="px-4 py-2 border">Book Name</th>
                <th className="px-4 py-2 border">Taken Date</th>
                <th className="px-4 py-2 border">Last Day</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {bookTakers.map((taker, index) => {
                  const isDueToday = taker.lastDay === today;
                  const rowColor = isDueToday ? "bg-red-100" : "bg-green-100";

                  return (
                    <motion.tr
                      key={taker.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`${rowColor} even:bg-opacity-75`}
                    >
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{taker.reader_name}</td>
                      <td className="px-4 py-2 border">{taker.book_title}</td>
                      <td className="px-4 py-2 border">{taker.from_date}</td>
                      <td className="px-4 py-2 border">{taker.return_date}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BooksToCollectList;
