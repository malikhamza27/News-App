import React from "react";
import NewsCard from "./NewsCard";
import "../ComponentCss/NewsList.css";

function NewsList({ articles }) {
  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

export default NewsList;
