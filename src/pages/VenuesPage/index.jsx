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
          {[...Array(pageCount)].map((item, index) => (
            <li key={index}>
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Venues;
