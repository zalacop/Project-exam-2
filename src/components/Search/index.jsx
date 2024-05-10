import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import holidazeUrls from "../../utils/url";
import useApi from "../../hooks/useFetchApi";

function Search() {
  const { data: venues } = useApi(
    holidazeUrls.urlVenues + "?_owner=true&_bookings=true",
  );

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(venues);
  const [originalVenues, setOriginalVenues] = useState(venues);

  useEffect(() => {
    setOriginalVenues(venues);
    setSearchResult(venues);
  }, [venues]);

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    const filteredResults = originalVenues.filter((venue) => {
      const search = searchValue.toLowerCase().trim();
      return (
        venue.name.toLowerCase().includes(search) ||
        (venue.location &&
          Array.isArray(venue.location) &&
          venue.location.some(
            (location) =>
              (location.country &&
                location.country.toLowerCase().includes(searchTerm)) ||
              (location.city &&
                location.city.toLowerCase().includes(searchTerm)) ||
              (location.continent &&
                location.continent.toLowerCase().includes(searchTerm)),
          ))
      );
    });
    setSearchResult(filteredResults);
  }, [searchValue, originalVenues]);

  function handleVenueClick() {
    setSearchValue("");
  }

  return (
    <>
      <div className="w-100 mx-auto flex items-center justify-center bg-dark-green py-4">
        <div className="w-50 relative">
          <input
            type="search"
            name="search"
            className="text-gray-800 bg-white w-full appearance-none border-2 border-dark px-3 py-2 pl-10 focus:outline-none"
            value={searchValue}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Search..."
            id="search"
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            <span className="input-group-text p-2">
              <FaSearch className="h-6 w-6 text-dark" />
            </span>
          </div>
        </div>
      </div>

      <div>
        {searchValue &&
          searchResult.map((venue) => (
            <div key={venue.id} className="text-white">
              {venue.name}
            </div>
          ))}
      </div>
    </>
  );
}

export default Search;
