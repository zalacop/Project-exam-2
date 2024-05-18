import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";
import ImageGallery from "../ImageGallery";
import MetaList from "../Meta";

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

  function isRangeBooked(startDate, endDate) {
    return false;
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

  return (
    <div className="container mx-auto mt-20 pt-10">
      {data && (
        <>
          <h2 className="mt-5 text-2xl font-bold">{data.name}</h2>
          <span>{data.rating}</span>
          <div className="flex flex-wrap">
            {data.location ? (
              <>
                <p className="mr-2 text-lg">{data.location.address},</p>
                <p className="mr-2 text-lg">{data.location.city},</p>
                <p className="mr-2 text-lg">
                  {data.location.country || "Mystery Destination!"}
                </p>
              </>
            ) : (
              <p className="mr-2 text-lg">Mystery Destination!</p>
            )}
          </div>
        </>
      )}

      <ImageGallery data={data} />

      {data && data.meta && (
        <div className="mx-auto mb-10 flex w-[70%] flex-col items-center justify-between gap-5 sm:flex-row">
          <MetaList data={data} />
          <div className="flex flex-col">
            <p className="mx-auto text-lg font-semibold">{data.price}$</p>
            <p>per night</p>
          </div>
          <div className="flex gap-2">
            <p className="text-lg font-semibold">Max Guests: </p>
            <p className="text-lg">{data.maxGuests}</p>
          </div>
        </div>
      )}

      {data && (
        <div>
          <p>{data.description}</p>
        </div>
      )}

      <button className="mx-auto my-10 flex border px-8 py-1 font-bold">
        Book Now
      </button>

      <div className="z-40">
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
    </div>
  );
}

export default ViewVenue;
