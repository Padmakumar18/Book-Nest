import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "./Components/Content";
import AddNewReader from "./Components/AddNewReader";
import AddNewBook from "./Components/AddNewBook";
import BookList from "./Components/BookList";
import ProfileList from "./Components/ProfilesList";

function App() {
  const [showPopup, setShowPopup] = useState(null);
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);

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

  const logout = () => {
    toast.success("Logged out successfully!");
  };

  const togglePopup = (popupName) => {
    setShowPopup((prev) => (prev === popupName ? null : popupName));
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <div className="header">
        <p className="title">Book Manager</p>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />

      <div className="buttons mt-6 mb-5">
        <button
          className="button"
          onClick={() => togglePopup("showAllBooks")}
        >
          {showPopup === "showAllBooks" ? "Back Home" : "View all books"}
        </button>
        <button
          className="button"
          onClick={() => setShowPopup("addNewReader")}
        >
          + Add new reader
        </button>
        <button
          className="button"
          onClick={() => setShowPopup("addNewBook")}
        >
          + Add new book
        </button>
        <button
          className="button"
          onClick={() => togglePopup("showAllProfiles")}
        >
          {showPopup === "showAllProfiles" ? "Back Home" : "Search profile"}
        </button>
        <button
          className="button"
          onClick={() => togglePopup("bookToCollect")}
        >
          {showPopup === "bookToCollect" ? "Back Home" : "Books to collect: 10+"}
        </button>
      </div>

      <div>
        {showPopup === "showAllBooks" && <BookList />}
        {showPopup === "addNewReader" && (
          <AddNewReader onClose={() => setShowPopup(null)} onAdd={handleAddReader} />
        )}
        {showPopup === "addNewBook" && (
          <AddNewBook onClose={() => setShowPopup(null)} onAdd={handleAddBook} />
        )}
        {showPopup === "showAllProfiles" && <ProfileList/>}
        {showPopup === "bookToCollect" && <p>Books to collect coming soon...</p>}

        {!showPopup && <Content />}
        
      </div>
    </div>
  );
}

export default App;
