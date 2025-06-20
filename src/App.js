import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from 'react-hot-toast';

import AddBookTaker from "./Components/AddBookTaker";
import AddNewReader from "./Components/AddNewReader";
import AddNewBook from "./Components/AddNewBook";
import BookList from "./Components/BookList";
import ProfileList from "./Components/ProfilesList";
import Loading from "./Components/Loading";
import Login from "./Components/Login";

import supabase from "./supabaseClient";

function App() {
  const [showPage, setshowPage] = useState("addBookTaker");
  const [books, setBooks] = useState([]);
  const [readers, setReaders] = useState([]);
  const [bookTakers, setbookTakers] = useState([]);
  const [userId, setUserId] = useState("");
  const [lastBookNumber, setlastBookNumber] = useState(0);

  const hasAutoLoggedIn = useRef(false); // ✅ To prevent auto-login firing twice

  useEffect(() => {
    if (hasAutoLoggedIn.current) return;
    hasAutoLoggedIn.current = true;

    setshowPage("Loading");
    const localStorageEmail = localStorage.getItem("library-management-email");
    const localStoragePass = localStorage.getItem("library-management-pass");
    if (localStorageEmail && localStoragePass) {
      autoLogin(localStorageEmail, localStoragePass);
    } else {
      setshowPage("Login");
    }
  }, []);

  async function fetchBooks() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    if (!user) {
      console.error("No user logged in.");
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data);
      setlastBookNumber(getLastBookNumber(data));
    }
  }

  function getLastBookNumber(books) {
    return books.reduce(
      (max, book) => (book.book_number > max ? book.book_number : max),
      0
    );
  }

  async function fetchProfiles() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    if (!user) {
      console.error("No user logged in.");
      return;
    }

    const { data, error } = await supabase
      .from("readers")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching profiles:", error);
    } else {
      setReaders(data);
    }
  }

  async function fetchBookTakers() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    if (!user) {
      console.error("No user logged in.");
      return;
    }

    const { data, error } = await supabase
      .from("book_takers")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching profiles:", error);
    } else {
      setbookTakers(data);
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
      await fetchBooks();
      await fetchProfiles();
      await fetchBookTakers();
      setshowPage("addBookTaker");
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
      <Toaster position="top-center" />
      {showPage !== "Login" && showPage !== "Loading" && (
        <>
          <div className="header">
            <p className="title">Book Manager</p>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
          <hr />

          <div className="buttons mt-6 mb-5 flex flex-wrap gap-3">
            <button
              className={`button ${
                showPage === "addBookTaker" ? "active" : ""
              }`}
              onClick={() => setshowPage("addBookTaker")}
            >
              Issue Book
            </button>

            <button
              className={`button ${
                showPage === "showAllBooks" ? "active" : ""
              }`}
              onClick={() => setshowPage("showAllBooks")}
            >
              View All Books
            </button>

            <button
              className={`button ${
                showPage === "showAllProfiles" ? "active" : ""
              }`}
              onClick={() => setshowPage("showAllProfiles")}
            >
              Profiles
            </button>                  

            <button
              className={`button ${
                showPage === "addNewReader" ? "active" : ""
              }`}
              onClick={() => setshowPage("addNewReader")}
            >
              Add New Reader
            </button>

            <button
              className={`button ${showPage === "addNewBook" ? "active" : ""}`}
              onClick={() => setshowPage("addNewBook")}
            >
              Add New Book
            </button>
          </div>
        </>
      )}

      <div>
        {showPage === "Loading" ? (
          <Loading />
        ) : showPage === "Login" ? (
          <Login setshowPage={setshowPage} supabase={supabase} />
        ) : showPage === "addBookTaker" ? (
          <AddBookTaker
            supabase={supabase}
            fetchBooks={fetchBooks}
            book_takers={bookTakers}
            readers={readers}
            books={books}
            fetchBookTakers={fetchBookTakers}
            userId={userId}
          />
        ) : showPage === "showAllBooks" ? (
          <BookList
            supabase={supabase}
            books={books}
            userId={userId}
            fetchBooks={fetchBooks}
            fetchBookTakers={fetchBookTakers}
          />
        ) : showPage === "addNewReader" ? (
          <AddNewReader
            supabase={supabase}
            fetchProfiles={fetchProfiles}
            userId={userId}
          />
        ) : showPage === "addNewBook" ? (
          <AddNewBook
            supabase={supabase}
            fetchBooks={fetchBooks}
            userId={userId}
            lastBookNumber={lastBookNumber}
          />
        ) : showPage === "showAllProfiles" ? (
          <ProfileList
            supabase={supabase}
            profilesList={readers}
            userId={userId}
            fetchProfiles={fetchProfiles}
            fetchBookTakers={fetchBookTakers}
          />
        ) : (
          <AddBookTaker
            supabase={supabase}
            fetchBooks={fetchBooks}
            book_takers={bookTakers}
            readers={readers}
            books={books}
            fetchBookTakers={fetchBookTakers}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}

export default App;