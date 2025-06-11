import "./CssFile/Loading.css";

function Loading() {
  return (
    <div className="library-loader">
      <div className="floating-book">
        <div className="cover front"></div>
        <div className="cover back"></div>
        <div className="spine"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loading;
