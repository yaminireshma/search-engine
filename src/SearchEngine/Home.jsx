import React, { useEffect, useRef } from "react";
import styles from "./Pagination.module.css";
const Home = ({
  baseUrl,
  currentSearch,
  setCurrentSearch,
  setHistoryData,
  historyData,
  editFlag,
  setEditFlag,
  historyIndex,
  setShowHome,
  setShowHistory,
  pageNumber,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (currentSearch.length) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  const historyHandle = () => {
    setHistoryData([currentSearch, ...historyData]);
  };

  useEffect(() => {
    setHistoryData(historyData);
  }, [historyData]);

  const submitHandle = (e) => {
    e.preventDefault();
    if (editFlag) {
      if (currentSearch !== "") {
        const originalIndex = (pageNumber - 1) * 5 + historyIndex;
        const updatedHistoryData = [...historyData];
        updatedHistoryData.splice(originalIndex, 1, currentSearch);
        setHistoryData(updatedHistoryData);
        setEditFlag(false);
        setCurrentSearch("");
        setShowHome(false);
        setShowHistory(true);
      }
    } else {
      if (currentSearch !== "") {
        historyHandle();
        window.open(`${baseUrl}${currentSearch}`, "_blank");
        setCurrentSearch("");
      }
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.heading}>Wanna Search Something...</div>
      <form onSubmit={submitHandle}>
        <div className={styles.homeContainer}>
          <input
            type="text"
            onChange={(e) => setCurrentSearch(e.target.value)}
            value={currentSearch}
            className={styles.homeSearch}
            ref={inputRef}
          />
          <input
            type="submit"
            className={styles.searchButton}
            value={`${editFlag ? "Edit" : "Search"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default Home;
