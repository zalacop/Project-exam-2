import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

function ViewVenue() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(
    `${holidazeUrls.urlVenues}/${id}?_owner=true&_bookings=true`,
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (isRangeBooked(start, end)) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  // Function to check if a date range is booked
  const isRangeBooked = (start, end) => {
    // Logic to check if the date range overlaps with any existing bookings
  };

  // Function to format date string
  const formatDateString = (date) => {
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString()
      : "";
  };

  return (
    <>
      {data && (
        <div>
          <h2>{data.name}</h2>
          <span>{data.rating}</span>
          {data.location && (
            <div>
              <p>{data.location.address}</p>
              <p>{data.location.city}</p>
              <p>{data.location.country}</p>
            </div>
          )}
        </div>
      )}

      {data && data.media && data.media.length > 0 && (
        <div>
          <img src={data.media[0]?.url} alt={data.media[0]?.alt} />
          <div>
            {data.media.length > 1 && (
              <img src={data.media[1]?.url} alt={data.media[1]?.alt} />
            )}
            <button>Show More</button>
          </div>
        </div>
      )}

      {data && data.meta && (
        <div>
          <div>
            <p>Wifi: {data.meta.wifi ? "Yes" : "No"}</p>
            <p>Parking: {data.meta.parking ? "Yes" : "No"}</p>
            <p>Breakfast: {data.meta.breakfast ? "Yes" : "No"}</p>
            <p>Pets: {data.meta.pets ? "Allowed" : "Not Allowed"}</p>
          </div>
          <p>{data.price}$ per night</p>
          <p>Max Guests: {data.maxGuests}</p>
        </div>
      )}

      {data && (
        <div>
          <p>{data.description}</p>
        </div>
      )}

      <button>Book Now</button>

      <div>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={new Date()}
          filterDate={(date) => !isRangeBooked(date)}
          monthsShown={2}
        />
      </div>
    </>
  );
}

export default ViewVenue;
