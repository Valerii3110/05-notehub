// src/components/Pagination/Pagination.tsx
import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onChangePage: (p: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onChangePage }) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      forcePage={page - 1}
      pageCount={pageCount}
      onPageChange={({ selected }) => onChangePage(selected + 1)}
    />
  );
};

export default Pagination;
