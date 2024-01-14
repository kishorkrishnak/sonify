import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useAppContext } from "../../App";
import "./Pagination.css";
const Pagination = ({
  items,
  itemsPerPage,
  renderItems,
  showPagination = true,
}) => {
  const { loadingRef } = useAppContext();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    loadingRef.current?.continuousStart();
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);

    loadingRef.current?.complete();
    window.scroll(0, 0);
  };

  return (
    <>
      {renderItems(currentItems)}
      {showPagination && (
        <ReactPaginate
          className="react-paginate mt-5"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
};

export default Pagination;
