import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      {/* <img src="/images/book.webp" alt="Book" /> */}
      <div className="buttons">
        <button className="button">View all books</button>
        <button className="button">+ Add new reader</button>
        <button className="button">Search profile</button>
        <p className="remainder">Books to collect</p>
      </div>
    </div>
  );
}

export default Dashboard;