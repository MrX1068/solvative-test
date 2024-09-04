import React, { useState, useEffect } from "react";
import "../styles/Pagination.css";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Pagination = ({
  limit,
  setLimit,
  currentPage,
  totalCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / limit);

  const [inputValue, setInputValue] = useState(limit);
  const debouncedLimit = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedLimit !== limit) {
      setLimit(Math.min(10, Math.max(1, debouncedLimit)));
    }
  }, [debouncedLimit, limit, setLimit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <input
            type="number"
            id="itemsPerPage"
            value={inputValue}
            onChange={(e) => setInputValue(+e.target.value)}
            min="1"
            max="10"
          />
        </div>
      </div>
      {inputValue > 10 && (
        <p className="warning">Please enter a number between 1 and 10.</p>
      )}
    </>
  );
};

export default Pagination;
