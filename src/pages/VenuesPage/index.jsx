import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import VenueCard from "../../components/Venues";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

function Venues() {
  const [allVenues, setAllVenues] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const venuesPerPage = 30;

  const fetchUrl = `${holidazeUrls.urlVenues}?sort=name&sortOrder=asc&page=${currentPage}&limit=${venuesPerPage}`;
  const { data, isLoading, isError } = useApi(fetchUrl);

  useEffect(() => {
    if (data) {
      if (data.meta) {
        setPageCount(data.meta.pageCount);
      }
      if (data.data) {
        setAllVenues(data.data);
      }
    }
  }, [data]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data: {isError.message}</div>;

  const maxPagesToShow = 5;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
  let endPage = Math.min(startPage + maxPagesToShow - 1, pageCount);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <>
      <Search onSearch={handleSearchResults} />
      {isSearching ? (
        searchResults.length === 0 ? (
          <div>No venues found</div>
        ) : (
          <VenueCard venues={searchResults} />
        )
      ) : (
        <VenueCard venues={allVenues} />
      )}

      {!isSearching && (
        <ul className="mx-auto mb-20 flex justify-center gap-3">
          {currentPage !== 1 && (
            <li>
              <button onClick={() => paginate(1)}>1</button>
            </li>
          )}
          {currentPage > 2 && (
            <li>
              <button onClick={() => paginate(currentPage - 1)}>&laquo;</button>
            </li>
          )}
          {[...Array(endPage - startPage + 1)].map((_, index) => (
            <li key={startPage + index}>
              <button
                onClick={() => paginate(startPage + index)}
                style={{
                  fontWeight:
                    currentPage === startPage + index ? "bold" : "normal",
                }}
              >
                {startPage + index}
              </button>
            </li>
          ))}
          {currentPage < pageCount - 1 && (
            <li>
              <button onClick={() => paginate(currentPage + 1)}>&raquo;</button>
            </li>
          )}
          {currentPage !== pageCount && (
            <li>
              <button onClick={() => paginate(pageCount)}>{pageCount}</button>
            </li>
          )}
        </ul>
      )}
    </>
  );
}

export default Venues;
