import React from "react";
import { Link, useParams } from "react-router-dom";

import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";
import ImageGallery from "../ImageGallery";
import MetaList from "../Meta";
import Calendar from "../Calandar";
import Booking from "../Forms/bookingVenue";
import Rating from "../Rating";

function ViewVenue() {
  const { id } = useParams();
  const {
    data: responseData,
    isLoading,
    isError,
  } = useApi(`${holidazeUrls.urlVenues}/${id}?_owner=true&_bookings=true`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !responseData) {
    return <div>Error fetching data</div>;
  }

  const { data, meta } = responseData;

  const isRangeBooked = (startDate, endDate) => {
    if (!data || !data.bookings) return false;

    for (const booking of data.bookings) {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      if (
        (startDate >= bookingStart && startDate <= bookingEnd) ||
        (endDate >= bookingStart && endDate <= bookingEnd) ||
        (startDate <= bookingStart && endDate >= bookingEnd)
      ) {
        return true;
      }
    }
    return false;
  };

  const getDisabledDates = () => {
    if (!data || !data.bookings) return [];
    const disabledDates = [];

    data.bookings.forEach((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      let currentDate = new Date(bookingStart);

      while (currentDate <= bookingEnd) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return disabledDates;
  };

  return (
    <div className="container mx-auto mt-20 w-[90%] pt-10">
      <Link to="/venues">
        <p className="ml-10 text-lg underline">Back to venues</p>
      </Link>
      {data && (
        <>
          <h2 className="mb-5 mt-5 break-all text-2xl font-bold">
            {data.name}
          </h2>
          <Rating rating={data.rating} />
          <div className="mt-5 flex flex-wrap">
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

      {data && (
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
          <p className="mx-auto my-10 w-[80%] break-all text-lg">
            {data.description}
          </p>
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-10 xl:grid-cols-2">
        <Booking data={data} id={id} bookedDates={getDisabledDates()} />
        <Calendar
          isRangeBooked={isRangeBooked}
          disabledDates={getDisabledDates()}
        />
      </div>
    </div>
  );
}

export default ViewVenue;
