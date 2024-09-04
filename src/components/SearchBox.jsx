import React, { useState, useEffect, useRef } from "react";
import "../styles/SearchBox.css";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        searchRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <input
      ref={searchRef}
      type="text"
      className="search-box"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSearch}
      placeholder="Search places..."
    />
  );
};

export default SearchBox;
