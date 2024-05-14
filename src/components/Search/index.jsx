import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import holidazeUrls from "../../utils/url";
import useApi from "../../hooks/useFetchApi";
import VenueCard from "../Venues";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError } = useApi(
    holidazeUrls.urlVenues + "?_owner=true&_bookings=true",
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const filteredVenues = searchValue
    ? data.filter((venue) => {
        const nameMatch = venue.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const cityMatch =
          venue.location.city &&
          venue.location.city.toLowerCase().includes(searchValue.toLowerCase());
        const countryMatch =
          venue.location.country &&
          venue.location.country
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        const continentMatch =
          venue.location.continent &&
          venue.location.continent
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        return nameMatch || cityMatch || countryMatch || continentMatch;
      })
    : [];

  return (
    <>
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
      {filteredVenues.length > 0 && (
        <div className="flex w-full max-w-[990px] flex-wrap justify-center">
          <VenueCard venues={filteredVenues} className="mt-6" />
        </div>
      )}
    </>
  );
}

export default Search;
