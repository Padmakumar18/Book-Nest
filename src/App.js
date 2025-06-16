import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Content from "./Components/AddBookTaker";
import AddNewReader from "./Components/AddNewReader";
import AddNewBook from "./Components/AddNewBook";
import BookList from "./Components/BookList";
import ProfileList from "./Components/ProfilesList";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import BooksToCollectList from "./Components/BooksToCollectList";

import supabase from "./supabaseClient";
import { needToCollect } from "./NeedToCollect";

function App() {
  const [showPage, setshowPage] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setshowPage("Loading");
    const localStorageEmail = localStorage.getItem("library-management-email");
    const localStoragePass = localStorage.getItem("library-management-pass");
    if (localStorageEmail && localStoragePass) {
      autoLogin(localStorageEmail, localStoragePass);
    } else {
      setshowPage("Login");
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [supabase]);

  useEffect(() => {
    console.log("books")
      console.log(books)
  }, [books]);

  async function fetchProfiles() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // console.log("User UID:", user.id);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    } else {
      console.log("Books for this user:", data);
      setBooks(data)
    }
  }

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
              onClick={() => togglePopup("addNewReader")}
            >
              {showPage === "addNewReader" ? "Back Home" : "+ Add new reader"}
            </button>

            <button
              className="button"
              onClick={() => togglePopup("addNewBook")}
            >
              {showPage === "addNewBook" ? "Back Home" : " + Add new book"}
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
                : `Books to collect: ${
                    needToCollect && needToCollect.length !== 0
                      ? needToCollect.length
                      : 0
                  }`}
            </button>
          </div>
        </>
      )}

      <div>
        {showPage === "Login" && (
          <Login setshowPage={setshowPage} supabase={supabase} />
        )}
        {showPage === "Content" && <Content supabase={supabase} />}
        {showPage === "Loading" && <Loading supabase={supabase} />}
        {showPage === "showAllBooks" && <BookList supabase={supabase} books={books} />}
        {showPage === "addNewReader" && <AddNewReader supabase={supabase} />}
        {showPage === "addNewBook" && <AddNewBook supabase={supabase} />}
        {showPage === "showAllProfiles" && <ProfileList supabase={supabase} />}
        {showPage === "bookToCollect" && (
          <BooksToCollectList supabase={supabase} />
        )}
      </div>
    </div>
  );
}

export default App;
