import React from "react";
import "./Pagination.css";

export default function Pagination({
  recipesPerPage,
  recipes,
  paginate,
  currentPage,
}) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.length > 0 && (
        <h5>
          Page: {currentPage} / {pageNumbers.length}
        </h5>
      )}
      <div className="pagination">
        <button
          key="prev"
          onClick={() => {
            if (currentPage > 1) {
              paginate(currentPage - 1);
            }
          }}
        >
          {"<"}
        </button>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={number === currentPage ? "active" : ""}
              >
                {number}
              </button>
            );
          })}
        <button
          key="next"
          onClick={() => {
            if (currentPage < pageNumbers.length) {
              paginate(currentPage + 1);
            }
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
