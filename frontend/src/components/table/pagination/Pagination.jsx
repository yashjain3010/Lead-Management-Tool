import React from "react";

const Pagination = ({ totalPages, currentPage, setPage }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          disabled={i + 1 === currentPage}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
