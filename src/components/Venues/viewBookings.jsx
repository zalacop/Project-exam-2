import React from "react";
import formatDate from "../../utils/dateFormat";
import { useParams } from "react-router";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

function ViewBookings() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(
    `${holidazeUrls.urlVenues}/${id}?_bookings=true`,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="mx-auto mt-20 flex w-[90%] flex-col items-center justify-center">
      <h2 className="my-5 mb-10 flex justify-center text-2xl font-bold">
        Bookings for {data && data.name}
      </h2>

      {data && data.bookings && data.bookings.length > 0 ? (
        <div className="grid w-full max-w-screen-lg grid-cols-1 gap-4 sm:grid-cols-2">
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
        <div className="text-xl">The venue has no bookings!</div>
      )}
    </div>
  );
}

export default ViewBookings;
