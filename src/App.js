import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import Content from "./Components/Content";
import Loading from "./Components/Loading";
import AddNewReader from "./Components/AddNewReader";
import AddNewBook from "./Components/AddNewBook";

function App() {
  const [showPopup, setShowPopup] = useState(null); 
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState("Content");

  const handleAddReader = (newReader) => {
    setReaders((prev) => [...prev, newReader]);
    toast.success("New reader added successfully!");
    setShowPopup(null);
  };

  const handleAddBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
    toast.success("New book added successfully!");
    setShowPopup(null);
  };

  function logout() {
    console.log("Logout");
    toast.success("Logged out successfully!");
  }

  function changePage(str) {
    setShowPopup(str);
  }

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <div>
        <div className="header">
          <p className="title">Book Manager</p>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
        <hr />
      </div>
      
      <div className="buttons mt-6 mb-5">
        <button className="button" onClick={() => changePage("showAllBooks")}>
          View all books
        </button>
        <button className="button" onClick={() => changePage("addNewReader")}>
          + Add new reader
        </button>
        <button className="button" onClick={() => changePage("addNewBook")}>
          + Add new book
        </button>
        <button className="button" onClick={() => changePage("showAllProfiles")}>
          Search profile
        </button>
        <button className="button" onClick={() => changePage("bookToCollect")}>
          Books to collect: 10+
        </button>
      </div>

      <div>
        {showPopup === "addNewReader" && (
          <AddNewReader
            onClose={() => setShowPopup(null)}
            onAdd={handleAddReader}
          />
        )}
        
        {showPopup === "addNewBook" && (
          <AddNewBook
            onClose={() => setShowPopup(null)}
            onAdd={handleAddBook}
          />
        )}
        {page === "content" && (
          <AddNewBook
            onClose={() => setShowPopup(null)}
            onAdd={handleAddBook}
          />
        )}
        
        <Content />
      </div>
    </div>
  );
}

export default App;