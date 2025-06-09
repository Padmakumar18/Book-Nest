// import logo from './logo.svg';
import "./App.css";
import Login from "./Components/Login";
import Content from "./Components/Content";
import Loading from "./Components/Loading";

function App() {

  function logout(){
    console.log("Logout")
  }
  return (
    <div className="App">
      <div>
        <div className="header">
          <p className="title">Book Manager</p>
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>

        <hr />
      </div>
       <div className="buttons mt-6 mb-5">
        <button className="button">View all books</button>
        <button className="button">+ Add new reader</button>
        <button className="button">+ Add new book</button>
        <button className="button">Search profile</button>
        <p className="button">Books to collect: 10+</p>
      </div>

      {/* <Login/> */}
      <Content />
      {/* <Loading/> */}
    </div>
  );
}

export default App;
