import React from "react";
import "../ComponentCss/Header.css";

function Header({ query, setQuery, handleSearch }) {
  return (
    <header className="header">
      <h1>Latest News</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </header>
  );
}

export default Header;
