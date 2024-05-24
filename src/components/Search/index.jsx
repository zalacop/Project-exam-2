import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import holidazeUrls from "../../utils/url";
import useApi from "../../hooks/useFetchApi";
import VenueCard from "../Venues/index";

function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const url = `${holidazeUrls.urlVenues}/search?q=${searchValue}`;
  const { data: responseData } = useApi(url);

  useEffect(() => {
    if (responseData) {
      setSearchResults(responseData.data || []);
      onSearch(responseData.data || []);
      setLoading(false);
      setError(false);
    } else {
      setLoading(true);
    }
  }, [responseData, onSearch]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      setLoading(true);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      onSearch([]);
      setIsSearching(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data: {isError.message}</div>;

  return (
    <>
      <div className="mx-auto my-auto flex w-full flex-col items-center bg-dark-green py-5 pb-5">
        <div className="relative w-1/3">
          <input
            type="search"
            name="search"
            className="text-gray-800 bg-white w-full appearance-none border-2 border-dark px-3 py-2 pl-10 focus:outline-none"
            value={searchValue}
            onChange={handleSearchChange}
            autoComplete="off"
            placeholder="Search"
            id="search"
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            <span className="input-group-text p-2" onClick={handleSearch}>
              <FaSearch className="h-6 w-6 text-dark" />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-background">
        <div className="w-full bg-background">
          <VenueCard venues={searchResults} />
        </div>
      </div>
    </>
  );
}

export default Search;
