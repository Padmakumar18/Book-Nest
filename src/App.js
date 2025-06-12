import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "./Components/Content";
import AddNewReader from "./Components/AddNewReader";
import AddNewBook from "./Components/AddNewBook";
import BookList from "./Components/BookList";
import ProfileList from "./Components/ProfilesList";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import supabase from "./supabaseClient";

function App() {
  const [showPage, setshowPage] = useState(null);
  const [readers, setReaders] = useState([]);
  const [books, setBooks] = useState([]);

  const handleAddReader = (newReader) => {
    setReaders((prev) => [...prev, newReader]);
    toast.success("New reader added successfully!");
    // setshowPage(null);
  };

  const handleAddBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
    toast.success("New book added successfully!");
    // setshowPage(null);
  };

  useEffect(() => {
    // console.log(localStorage.getItem("library-management-email"))
    setshowPage("Loading");
    const localStorageEmail = localStorage.getItem("library-management-email");
    const localStoragePass = localStorage.getItem("library-management-pass");
    if (localStorageEmail && localStoragePass) {
      autoLogin(localStorageEmail, localStoragePass);
    } else {
      setshowPage("Login"); 
    }
  }, []);

  const autoLogin = async (storedEmail, storedPassword) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: storedEmail,
      password: storedPassword,
    });
    if (error) {
      toast.error("Auto login failed");
      console.error(error.message);
      setshowPage("Login");
    } else {
      toast.success("Auto login successful!");
      setshowPage("Content");
    }
  };

  const logout = async () => {
    localStorage.removeItem("library-management-email");
    localStorage.removeItem("library-management-pass");

    let { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Try again");
    } else {
      toast.success("Logged out successfully!");
      setshowPage("Login");
    }
  };

  const togglePopup = (popupName) => {
    setshowPage((prev) => (prev === popupName ? "Content" : popupName));
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      {showPage !== "Login" && showPage !== "Loading" && (
        <>
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
              {showPage === "showAllBooks" ? "Back Home" : "View all books"}
            </button>

            <button
              className="button"
              onClick={() => setshowPage("addNewReader")}
            >
              + Add new reader
            </button>

            <button
              className="button"
              onClick={() => setshowPage("addNewBook")}
            >
              + Add new book
            </button>

            <button
              className="button"
              onClick={() => togglePopup("showAllProfiles")}
            >
              {showPage === "showAllProfiles" ? "Back Home" : "Search profile"}
            </button>

            <button
              className="button"
              onClick={() => togglePopup("bookToCollect")}
            >
              {showPage === "bookToCollect"
                ? "Back Home"
                : "Books to collect: 10+"}
            </button>
          </div>
        </>
      )}

      <div>
        {showPage === "Login" && <Login setshowPage={setshowPage} />}
        {showPage === "Content" && <Content />}
        {showPage === "Loading" && <Loading />}
        {showPage === "showAllBooks" && <BookList />}
        {showPage === "addNewReader" && (
          <AddNewReader
            onClose={() => setshowPage("Content")}
            onAdd={handleAddReader}
          />
        )}
        {showPage === "addNewBook" && (
          <AddNewBook
            onClose={() => setshowPage("Content")}
            onAdd={handleAddBook}
          />
        )}
        {showPage === "showAllProfiles" && <ProfileList />}
        {showPage === "bookToCollect" && <p>Books to collect coming soon...</p>}
      </div>
    </div>
  );
}

export default App;
