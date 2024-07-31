import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header";
import NewsList from "./Components/NewsList";
import LoadMoreButton from "./Components/LoadMoreButton";
import Error from "./Components/Error";
import Loading from "./Components/Loading";
import "./App.css";


const API_KEY ="0c0fbc341d344a5a8a15876591dcb7d0";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedData = JSON.parse(localStorage.getItem("news")) || [];
      setArticles(storedData);
      setLoading(false);
    };

    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchAndStoreAllData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${
            query || "random"
          }&page=${page}&apiKey=${API_KEY}`
        );
        const newArticles = response.data.articles;
        const existingArticles = JSON.parse(localStorage.getItem("news")) || [];

        
        const updatedArticles =
          page === 1 ? newArticles : [...existingArticles, ...newArticles];

     
        setArticles(updatedArticles);
        localStorage.setItem("news", JSON.stringify(updatedArticles));
        setHasMore(newArticles.length > 0);
      } catch (error) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchAndStoreAllData();
  }, [page, query]);

  const handleSearch = async () => {
    setPage(1); 
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
      );
      const newArticles = response.data.articles;

      localStorage.setItem("news", JSON.stringify(newArticles));
      setArticles(newArticles);
      setHasMore(newArticles.length > 0);
    } catch (error) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="App">
      <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && <NewsList articles={articles} />}
      {!loading && !error && hasMore && (
        <LoadMoreButton fetchMoreData={fetchMoreData} />
      )}
    </div>
  );
}

export default App;
