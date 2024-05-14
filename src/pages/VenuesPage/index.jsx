import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import VenueCard from "../../components/Venues";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

function Venues() {
  const [allVenues, setAllVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const { data } = useApi(
    holidazeUrls.urlVenues + "?_owner=true&_bookings=true"
  );

  useEffect(() => {
    if (data) {
      setAllVenues(data);
      setFilteredVenues(data);
    }
  }, [data]);

  const handleFilteredVenues = (searchedVenues) => {
    setFilteredVenues(searchedVenues);
  };

  return (
    <>
      <Search
        allVenues={allVenues}
        onFilterVenues={handleFilteredVenues}
      />
      <VenueCard venues={filteredVenues} />
    </>
  );
}

export default Venues;
