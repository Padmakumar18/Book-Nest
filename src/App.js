// import logo from './logo.svg';
import "./App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Loading from "./Components/Loading";

function App() {
  return (
    <div className="App">
      <div>
        <p className="text-center">Book Manager</p>
        <hr />
      </div>
      {/* <Login/> */}
      <Dashboard />
      {/* <Loading/> */}
    </div>
  );
}

export default App;