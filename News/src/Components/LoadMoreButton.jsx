import React from "react";
import "../ComponentCss/LoadMoreButton.css";

function LoadMoreButton({ fetchMoreData }) {
  return (
    <div className="loadbutton">
      <button className="load-more" onClick={fetchMoreData}>
        Load More
      </button>
    </div>
  );
}

export default LoadMoreButton;
