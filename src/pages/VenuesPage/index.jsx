import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import VenueCard from "../../components/Venues";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

function Venues() {
  const [allVenues, setAllVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const venuesPerPage = 30;

  const fetchUrl = `${holidazeUrls.urlVenues}?sort=name&sortOrder=asc&page=${currentPage}&limit=${venuesPerPage}`;
  console.log(fetchUrl)
  const { data, isLoading, isError } = useApi(fetchUrl);

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
      console.log(data.data)
      if (data.meta) {
        console.log("Fetched metadata:", data.meta);
      } else {
        console.log("No meta found in fetched data");
      }

      if (data.data) {
        setAllVenues((prevVenues) => [...data.data]);
        setPageCount((data.meta.pageCount))
      } else {
        console.log("No venues found in fetched data");
      }
    }
  }, [data]);

  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = allVenues;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data: {isError.message}</div>;

  return (
    <>
      {/* <Search allVenues={allVenues} onFilterVenues={handleFilteredVenues} /> */}
      <VenueCard venues={currentVenues} />
      <ul className="mx-auto mb-20 flex justify-center gap-3">
        {[...Array(pageCount)]
            .map((item, index) => (
            <li key={index}>
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Venues;
