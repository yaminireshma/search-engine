import React, { useState, useEffect } from "react";
import Home from "./Home";
import History from "./History";
import styles from "./Pagination.module.css";

const baseUrl = "https://www.google.com/search?q=";

const Main = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSearchData, setCurrentSearchData] = useState("");
  const [recentSearchData, setRecentSearchData] = useState(
    JSON.parse(localStorage.getItem("search"))?.recentSearch ?? ""
  );
  const [historyData, setHistoryData] = useState(
    JSON.parse(localStorage.getItem("search"))?.history ?? []
  );
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showHome, setShowHome] = useState(true);
  const [showLastSearch, setShowLastSearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [pageNum, setPageNum] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(historyData.length / 5); i++) {
      pageNumbers.push(i);
    }
    setPageNum(pageNumbers);
  }, [historyData]);


  useEffect(() => {
    const searchData = {
      recentSearch: recentSearchData,
      history: [...historyData],
    };
    localStorage.setItem("search", JSON.stringify(searchData));
  }, [currentSearchData, recentSearchData, historyData]);

  useEffect(() => {
    const searchData = {
      recentSearch: recentSearchData,
      history: [...historyData],
    };
    localStorage.setItem("search", JSON.stringify(searchData));
  }, []);

  useEffect(() => {
    if (historyData.length > 0) {
      setRecentSearchData(historyData[0]);
    } else {
      setRecentSearchData("");
    }
  }, [historyData]);

  const handleLastSearch = () => {
    const lastSearch = JSON.parse(localStorage.getItem("search"))?.history[0];
    window.open(`${baseUrl}${lastSearch}`, "_self");
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.tabs}>
        <h4
          className={`${showHome && styles.homeStyle} ${styles.home} ${
            styles.header
          }`}
          onClick={() => {
            setShowHistory(false);
            setShowLastSearch(false);
            setShowHome(true);
          }}
        >
          Home
        </h4>
        <h4
          className={`${showLastSearch && styles.lastSearchStyle} ${
            recentSearchData !== "" && styles.lastSearch
          } ${recentSearchData === "" && styles.disable} ${styles.header}`}
          onClick={() => {
            if (recentSearchData !== "") {
              setShowHistory(false);
              setShowHome(false);
              setShowLastSearch(true);
              handleLastSearch();
            }
          }}
        >
          Last Search
        </h4>
        <h4
          className={`${showHistory && styles.historyStyle} ${styles.history} ${
            styles.header
          }`}
          onClick={() => {
            setShowHistory(true);
            setShowHome(false);
            setShowLastSearch(false);
          }}
        >
          History
        </h4>
      </div>
      <div className={styles.mainWrapper}>
        {showHome && (
          <Home
            baseUrl={baseUrl}
            currentSearch={currentSearch}
            setCurrentSearch={setCurrentSearch}
            setHistoryData={setHistoryData}
            historyData={historyData}
            setEditFlag={setEditFlag}
            editFlag={editFlag}
            historyIndex={historyIndex}
            setShowHome={setShowHome}
            setShowHistory={setShowHistory}
            pageNumber={pageNumber}
          />
        )}
        {showHistory && (
          <History
            historyData={historyData}
            setHistoryData={setHistoryData}
            baseUrl={baseUrl}
            setCurrentSearch={setCurrentSearch}
            setShowHome={setShowHome}
            setShowHistory={setShowHistory}
            setEditFlag={setEditFlag}
            setHistoryIndex={setHistoryIndex}
            setPageNumber={setPageNumber}
            pageNum={pageNum}
            showHome={showHome}
            showlastSearch={showLastSearch}
            setPageNum = {setPageNum}
          />
        )}
      </div>
    </div>
  );
};
export default Main;
