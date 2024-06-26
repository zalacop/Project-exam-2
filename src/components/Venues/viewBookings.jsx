import React from "react";
import formatDate from "../../utils/dateFormat";
import { useParams } from "react-router";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

function ViewBookings() {
  const { id } = useParams();
  const {
    data: venueData,
    isLoading,
    isError,
  } = useApi(`${holidazeUrls.urlVenues}/${id}?_bookings=true`);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !venueData) {
    return <div>Something went wrong!</div>;
  }

  const { data, meta } = venueData;

  return (
    <div className="mx-auto mt-20 flex w-[90%] flex-col items-start justify-center">
      <Link to="/profile">
        <p className="ml-10 font-cta text-lg underline hover:text-dark-green">
          Back to profile
        </p>
      </Link>
      <h2 className="mx-auto my-5 mb-10 flex justify-center text-2xl font-bold">
        Bookings for {data && data.name}
      </h2>

      {data && data.bookings && data.bookings.length > 0 ? (
        <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-4 sm:grid-cols-2">
          {data.bookings.map((booking) => (
            <div key={booking.id} className="flex w-full border p-4">
              {booking.customer.avatar && booking.customer.avatar.url && (
                <img
                  src={booking.customer.avatar.url}
                  alt={booking.customer.avatar.alt}
                  className="my-auto mr-4 h-16 w-16 rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {booking.customer.name}
                </h3>
                <p>
                  Booked from {formatDate(booking.dateFrom)} to{" "}
                  {formatDate(booking.dateTo)}
                </p>
                <p>Booked for {booking.guests} guests</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto text-xl">
          {data && data.bookings ? "The venue has no bookings!" : "Loading..."}
        </div>
      )}
    </div>
  );
}

export default ViewBookings;
