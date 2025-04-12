import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";
import HistoryPagination from "./HistoryPagination/HistoryPagination";
import { isMobile } from "react-device-detect";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const History = ({
  pageNum,
  setPageNumber,
  historyData,
  setHistoryData,
  baseUrl,
  setCurrentSearch,
  setShowHome,
  setShowHistory,
  setEditFlag,
  setHistoryIndex,
  showHome,
  showLastSearch,
  setPageNum,
}) => {
  const [perPage, setPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(null);
  const [endPage, setEndPage] = useState(null);
  const [newPage, setNewPage] = useState(1)

  useEffect(() => {
    pageHandler(1);
  }, []);

  useEffect(() => {
    pageHandler(1);
  }, [showHome, showLastSearch]);

  useEffect(()=>{
    pageHandler(currentPage);
  },[historyData])

  const historyDelete = (index) => {
    const originalIndex = (currentPage - 1) * 5 + index;
    const updatedHistoryData = [...historyData];
    updatedHistoryData.splice(originalIndex,1)
    const newPages = Math.ceil(updatedHistoryData.length/5)
    setNewPage(newPages)
    setHistoryData(updatedHistoryData);
  };

  const pageHandler = (pageNum) => {
    const firstCard = pageNum * 5 - 5;
    setStartPage(firstCard);
    const LastCard = pageNum * 5;
    setEndPage(LastCard);
    const list = historyData.slice(firstCard, LastCard);
    setPerPage(list);
  };

  return (
    <>
      {historyData.length > 0 ? (
        <div>
          <div className={styles.historyWrapper}>
            <div className={styles.historyContainers}>
              {perPage.map((val, index) => {
                return (
                  <div className={styles.section}>
                    <a
                      href={`${baseUrl}${val}`}
                      target="_blank"
                      className={styles.link}
                    >
                      {val}
                    </a>

                    <div className={styles.buttons}>
                        {isMobile ? (
                          <MdDelete color="#6f10a2"className={`${styles.buttons} ${styles.iconEdit}`} onClick={() => {
                            historyDelete(index);
                          }} />
                        ) : (
                          <button className={styles.button } onClick={() => {
                            historyDelete(index);
                          }}>Delete</button>
                        )}
                      <div
                        onClick={() => {
                          setCurrentSearch(val);
                          setShowHome(true);
                          setShowHistory(false);
                          setEditFlag(true);
                          setHistoryIndex(index);
                        }}
                      >
                        {isMobile ? (
                          <FaEdit color="#6f10a2" className={`${styles.buttons} ${styles.iconEdit}`}/>
                        ) : (
                          <button className={styles.button}>Edit</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.pagination_DeleteHistory}>
              <HistoryPagination
                pageHandler={pageHandler}
                setPageNumber={setPageNumber}
                pageNum={pageNum}
                historyData={historyData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setPageNum={setPageNum}
                newPage = {newPage}
              />

              <div className={styles.pageCount}>
                {`${startPage + 1} - ${
                  currentPage === pageNum.length ? historyData.length : endPage
                } of ${historyData.length}`}
              </div>

              <div
              className={styles.deleteMob}
              >
              <button
                onClick={() => {
                  setHistoryData([]);
                }}
                className={styles.deleteAll}
              >
                Delete History
              </button>
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        <h1 className={styles.noData}>No Search data!!!</h1>
      )}
    </>
  );
};
export default History;
