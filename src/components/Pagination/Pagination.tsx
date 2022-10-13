import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import "./Pagination.css";
interface IPagination {
  canGoBack: boolean;
  setPageNo: any;
  previousPage: any;
  nextPage: any;
  canGoNext: boolean;
  pageCount: any;
  pageOptions: any;
  pageNo: number;
}

export const Pagination: React.FC<IPagination> = ({
  setPageNo,
  canGoBack,
  previousPage,
  nextPage,
  canGoNext,
  pageCount,
  pageOptions,
  pageNo,
}) => {
  return (
    <>
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => setPageNo(1)}
          disabled={!canGoBack}
        >
          <AiOutlineDoubleLeft></AiOutlineDoubleLeft>
        </button>
        <button
          className="pagination-btn"
          onClick={() => {
            setPageNo(pageNo - 1);
            previousPage();
          }}
          disabled={!canGoBack}
        >
          Previous
        </button>{" "}
        <button
          className="pagination-btn"
          onClick={() => {
            setPageNo(pageNo + 1);
            nextPage();
          }}
          disabled={!canGoNext}
        >
          Next
        </button>{" "}
        <button
          className="pagination-btn"
          onClick={() => setPageNo(pageCount)}
          disabled={!canGoNext}
        >
          <AiOutlineDoubleRight></AiOutlineDoubleRight>
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageNo} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </>
  );
};

export default Pagination;
