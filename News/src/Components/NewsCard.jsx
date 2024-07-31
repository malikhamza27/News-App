import React from "react";
import "../ComponentCss/NewsCard.css";

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <div className="title">
        <h2>{article.title}</h2>
      </div>
      <div className="description">
{article.description?<p>{article.description}</p>:<p>No description availble</p>}
      </div>
      <p>
        <strong>Source:</strong> {article.source.name}
      </p>
      <p>
        <strong>Published:</strong>{" "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}

export default NewsCard;
