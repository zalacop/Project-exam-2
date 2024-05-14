import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

function Search({ allVenues, onFilterVenues }) {
  const [searchValue, setSearchValue] = useState("");

  const filterVenues = useCallback(
    (searchInput) => {
      if (searchInput === "") {
        return allVenues; 
      } else {
        return allVenues.filter((venue) => {
          const nameMatch = venue.name.toLowerCase().includes(searchInput.toLowerCase());
          const cityMatch =
            venue.location.city &&
            venue.location.city.toLowerCase().includes(searchInput.toLowerCase());
          const countryMatch =
            venue.location.country &&
            venue.location.country.toLowerCase().includes(searchInput.toLowerCase());
          const continentMatch =
            venue.location.continent &&
            venue.location.continent.toLowerCase().includes(searchInput.toLowerCase());
          return nameMatch || cityMatch || countryMatch || continentMatch;
        });
      }
    },
    [allVenues]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredVenues = filterVenues(searchValue);
      onFilterVenues(filteredVenues);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, onFilterVenues, filterVenues]);

  return (
    <div className="w-100 mx-auto flex items-center justify-center bg-dark-green py-4">
      <div className="w-50 relative">
        <input
          type="search"
          name="search"
          className="text-gray-800 bg-white w-full appearance-none border-2 border-dark px-3 py-2 pl-10 focus:outline-none"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          autoComplete="off"
          placeholder="Search"
          id="search"
        />
        <div className="absolute inset-y-0 left-0 flex items-center">
          <span className="input-group-text p-2">
            <FaSearch className="h-6 w-6 text-dark" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Search;
