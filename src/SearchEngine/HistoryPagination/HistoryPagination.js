import React, { useEffect, useState } from "react";
import styles from "../Pagination.module.css";

const HistoryPagination = ({
  historyData,
  pageHandler,
  setPageNumber,
  pageNum,
  currentPage,
  setCurrentPage,
  setPageNum,
  newPage,
}) => {

  const [newPageNum, setNewPageNum] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endFlag, setEndFlag] = useState(true);
  const [prevFlag, setPrevFlag] = useState(false);
  const [last, setLast] = useState(true);

  useEffect(() => {
    updatePageNum();
    pageHandler(currentPage);
  }, [currentPage, pageNum]);

  useEffect(() => {
    if (pageNum.length <= 5) {
      setNewPageNum(pageNum);

      if (currentPage > newPage) {
        pageNum.pop();
        setCurrentPage(pageNum.length);
      }
    } else if (currentPage == pageNum.length) {
      if (currentPage > newPage) {
        pageNum.pop();
      }
      const trimmedPages = [pageNum[0], "...", ...pageNum.slice(-3)];
      setNewPageNum(trimmedPages);
      setCurrentPage(pageNum.length);
    }
  }, [historyData]);

  const updatePageNum = () => {
    if (pageNum.length <= 5) {
      setNewPageNum(pageNum);
    } else {
      if (currentPage === 1) {
        const trimmedPages = [
          ...pageNum.slice(0, 3),
          "...",
          pageNum[pageNum.length - 1],
        ];
        setNewPageNum(trimmedPages);
        setEndFlag(true);
        setLast(true);
        setPrevFlag(false);
      } else if (currentPage === pageNum[pageNum.length - 1]) {
        const trimmedPages = [pageNum[0], "...", ...pageNum.slice(-3)];
        setNewPageNum(trimmedPages);
      } else if (currentPage - pageNum[pageNum.length - 1] === -2) {
        setPrevFlag(false);
        setPageNum(pageNum);
        const trimmedPages = [pageNum[0], "...", ...pageNum.slice(-3)];
        setLast(false);
        setNewPageNum(trimmedPages);
      } else if (currentIndex === 2 && endFlag && last) {
        const trimmedPages = [
          pageNum[0],
          "...",
          ...pageNum.slice(
            pageNum.indexOf(currentPage),
            pageNum.indexOf(currentPage) + 1
          ),
          "...",
          pageNum[pageNum.length - 1],
        ];
        setNewPageNum(trimmedPages);
      } else if (currentPage - pageNum[0] === 2) {
        const trimmedPages = [
          ...pageNum.slice(0, 3),
          "...",
          pageNum[pageNum.length - 1],
        ];
        setNewPageNum(trimmedPages);
      } else if (currentIndex === 2 && prevFlag) {
        const trimmedPages = [
          pageNum[0],
          "...",
          ...pageNum.slice(
            pageNum.indexOf(currentPage),
            pageNum.indexOf(currentPage) + 1
          ),
          "...",
          pageNum[pageNum.length - 1],
        ];
        setNewPageNum(trimmedPages);
      }
      else if(currentIndex==1){
        const trimmedPages = [
          ...pageNum.slice(0, 3),
          "...",
          pageNum[pageNum.length - 1],
        ];
        setNewPageNum(trimmedPages)
      }
      else if(currentIndex==2){
        const trimmedPages = [pageNum[0], "...", ...pageNum.slice(-3)];
        setNewPageNum(trimmedPages)
      }
    }
  };

  const nextHandler = () => {
    if (newPageNum.at(newPageNum.indexOf(currentPage) + 1) === "...") {
      setCurrentIndex(2);
      setCurrentPage(currentPage + 1);
      setEndFlag(true);

    } else {
      setCurrentPage(currentPage + 1);
      setCurrentIndex(currentIndex + 1);
      setEndFlag(false)
    }
  };

  const prevHandler = () => {
    setEndFlag(false);
    if (newPageNum.at(newPageNum.indexOf(currentPage) - 1) === "...") {
      setPrevFlag(true);
      setLast(true);
      setCurrentPage(currentPage - 1);
      setCurrentIndex(2);
    } else {
      setCurrentIndex(currentIndex - 1);
      setCurrentPage(currentPage - 1);
      setLast(true);
    }
  };

  return (
    <div className={styles.buttonWrapper}>
      <button
        onClick={prevHandler}
        className={`${styles.pageButtons} ${styles.directionButtons} ${
          currentPage === 1 ? styles.disable : ""
        }`}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {newPageNum?.map((pageNumber, index) => (
        <button
          key={index}
          className={`${styles.pageButtons} ${
            pageNumber === currentPage ? styles.pageButton : ""
          } ${pageNumber !== "..." && styles.borderHover}`}
          onClick={() => {
            if (pageNumber !== "...") {
              pageHandler(pageNumber);
              setPageNumber(pageNumber);
              setCurrentPage(pageNumber);
              setCurrentIndex(index);
              setEndFlag(false);
            }
          }}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={nextHandler}
        className={`${styles.pageButtons} ${styles.directionButtons} ${
          currentPage === pageNum[pageNum.length - 1] ? styles.disable : ""
        }`}
        disabled={currentPage === pageNum[pageNum.length - 1]}
      >
        {">"}
      </button>
    </div>
  );
};

export default HistoryPagination;
