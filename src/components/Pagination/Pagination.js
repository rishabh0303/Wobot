import React from "react";
import './Pagination.css'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    // <div className="pagination">
    //   {[...Array(totalPages)].map((_, index) => (
    //     <button
    //       key={index}
    //       className={currentPage === index + 1 ? "active" : ""}
    //       onClick={() => onPageChange(index + 1)}
    //     >
    //       {index + 1}
    //     </button>
    //   ))}
    // </div>
      <div className="pagination-container">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
  );
};

export default Pagination;
