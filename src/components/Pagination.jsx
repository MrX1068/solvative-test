import React from "react";
import "../styles/Pagination.css";

const Pagination = ({
  limit,
  setLimit,
  currentPage,
  totalCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items per page:</label>
        <input
          type="number"
          id="itemsPerPage"
          value={limit}
          onChange={(e) => setLimit(Math.min(10, Math.max(1, +e.target.value)))}
          min="1"
          max="10"
        />
      </div>
    </div>
  );
};

export default Pagination;
