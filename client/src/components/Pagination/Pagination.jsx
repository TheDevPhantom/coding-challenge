import React, { FC, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { DOTS, usePagination } from '../../hooks/usePagination';

const Pagination = ({
  nextPage,
  previousPage,
  selectedPage,
  total,
  count,
  currentPage,
  limit,
}) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize: limit,
    totalCount: total,
  });

  return (
    <div className='flex items-center justify-between'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-mist-100 dark:bg-mist-800 hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          href='#'
          className='ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-mist-100 dark:bg-mist-800 hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {limit * currentPage > total
                ? total - (count - 1)
                : limit * currentPage - (count - 1)}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {limit * currentPage > total ? total : limit * currentPage}
            </span>{' '}
            of <span className='font-medium'>{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-shade -space-x-px select-none'
            aria-label='Pagination'
          >
            <div
              onClick={() => previousPage()}
              className='cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md bg-mist-100 dark:bg-mist-800 text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Previous</span>
              <FaChevronLeft className='mx-1' aria-hidden='true' />
            </div>
            {paginationRange?.map((pageNumber) => {
              if (pageNumber === DOTS) {
                return (
                  <div className='bg-mist-100 dark:bg-mist-800 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium'>
                    &#8230;
                  </div>
                );
              }

              if (pageNumber === currentPage) {
                return (
                  <div className='cursor-pointer z-10 bg-mist-100 font-bold dark:bg-mist-800 text-primary relative inline-flex items-center px-4 py-2 text-sm'>
                    {pageNumber}
                  </div>
                );
              } else {
                return (
                  <div
                    onClick={() => selectedPage(pageNumber)}
                    className='cursor-pointer bg-mist-100 dark:bg-mist-800 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium'
                  >
                    {pageNumber}
                  </div>
                );
              }
            })}
            <div
              onClick={() => nextPage()}
              className='cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md bg-mist-100 dark:bg-mist-800 text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Next</span>
              <FaChevronRight className='mx-1' aria-hidden='true' />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
