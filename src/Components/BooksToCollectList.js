import { useState } from "react";
import { needToCollect } from "../NeedToCollect";

const BooksToCollectList = () => {
  const [bookTakers, setBookTakers] = useState(needToCollect);

  const handleDelete = (index) => {
    const updatedList = [...bookTakers];
    updatedList.splice(index, 1);
    setBookTakers(updatedList);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
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
              <th className="px-4 py-2 border">Taken Date</th>
              <th className="px-4 py-2 border">Last Day</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookTakers.map((taker, index) => {
              const isDueToday = taker.lastDay === today;
              const rowColor = isDueToday ? "bg-red-100" : "bg-green-100";

              return (
                <tr key={index} className={`${rowColor} even:bg-opacity-75`}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{taker.takenBy}</td>
                  <td className="px-4 py-2 border">{taker.bookName}</td>
                  <td className="px-4 py-2 border">{taker.takenDate}</td>
                  <td className="px-4 py-2 border">{taker.lastDay}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksToCollectList;
