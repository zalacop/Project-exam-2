import React from "react";

function MyVenues({ venues }) {
  return (
    <div className="mx-auto my-20 w-5/6 border px-10 py-8">
      <h2 className="mb-4 text-xl font-bold">My Venues</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {venues.map((venue, id) => (
          <div key={id} className="border p-4 shadow-md">
            <div className="flex flex-col items-center justify-center md:flex-row">
              <div className="mb-4 flex w-full flex-col items-center justify-between md:mb-0 md:mr-4 md:w-1/2">
                <img
                  className="mb-4 h-36 w-36 object-cover"
                  src={venue.media[0].url}
                  alt={venue.media[0].alt}
                />
                <h3 className="text-l mb-4 break-words text-center font-semibold md:mb-0">
                  {venue.name}
                </h3>
              </div>
              <div className="flex w-full flex-col items-center justify-between md:w-1/2">
                <div className="my-auto flex flex-col items-center justify-center gap-3">
                  <button className="mb-2 border px-8 py-1 font-bold md:mb-0 md:mr-2">
                    Edit Venue
                  </button>
                  <button className="mb-2 border px-8 py-1 font-bold md:mb-0 md:mr-2">
                    Delete
                  </button>
                  <button className="border px-8 py-1 font-bold">
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyVenues;
