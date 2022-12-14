import React from 'react';
import './pagination.css';

interface IPaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: Function;
}

const Pagination: React.FC<IPaginationProps> = ({
  nPages,
  currentPage,
  setCurrentPage,
}) => {
  let firstPageNumber: number;
  let lastPageNumber: number;

  // to display 3 page numbers
  if (currentPage === 1) {
    firstPageNumber = 1;
    lastPageNumber = 4;
  } else if (currentPage === nPages) {
    firstPageNumber = nPages - 2 || 1;
    lastPageNumber = firstPageNumber + 3;
  } else {
    firstPageNumber = currentPage - 1;
    lastPageNumber = currentPage + 2;
  }

  // gets an array containing the page numbers
  const pagesArray = [...Array(nPages + 1).keys()].slice(
    firstPageNumber,
    lastPageNumber
  );

  const previousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  return (
    <nav className="pagination w-100" role="navigation" aria-label="pagination">
      <div
        className="pagination-previous is-disabled hover-pointer"
        title="This is the first page"
        onClick={previousPage}
      >
        {'<<'}
      </div>
      <div className="pagination-next hover-pointer" onClick={nextPage}>
        {'>>'}
      </div>
      <ul className="pagination-list">
        {pagesArray.map((pageNumber) => {
          if (pageNumber === currentPage) {
            return (
              <li key={pageNumber}>
                <div
                  className="pagination-link is-current hover-pointer"
                  aria-label={`Page ${pageNumber}`}
                  aria-current="page"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </div>
              </li>
            );
          } else {
            return (
              <li key={pageNumber}>
                <div
                  className="pagination-link hover-pointer"
                  onClick={() => setCurrentPage(pageNumber)}
                  aria-label={`Goto page ${pageNumber}`}
                >
                  {pageNumber}
                </div>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
