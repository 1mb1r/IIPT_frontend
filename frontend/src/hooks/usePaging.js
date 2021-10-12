import { useState } from 'react';

const usePaging = (postsPerPage, items) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / postsPerPage);
  const pageItems = items.slice(currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage);
  return {
    totalPages, currentPage, setCurrentPage, pageItems,
  };
};

export default usePaging;
