// CustomPagination.jsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = 5; // Change this value to control the number of pages displayed around the current page

  const firstPage = Math.max(1, currentPage - range);
  const lastPage = Math.min(totalPages, currentPage + range);

  const generatePaginationItems = () => {
    let items = [];
    if (firstPage > 1) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" />);
    }
    for (let i = firstPage; i <= lastPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (lastPage < totalPages) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" />);
    }
    return items;
  };

  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />
      {generatePaginationItems()}
      <Pagination.Next
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
      <Pagination.Last onClick={() => onPageChange(totalPages)} />
    </Pagination>
  );
};

export default CustomPagination;
