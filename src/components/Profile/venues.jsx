import React, { useState } from "react";
import { Link } from "react-router-dom";
import deleteVenue from "../API/Venue/deleteVenue";
import UpdateVenue from "../ManageVenues/update";

function MyVenues({ venues }) {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateVenue, setUpdateVenue] = useState(null);

  const handleEdit = (venue) => {
    setUpdateVenue(venue);
    setIsModalOpen(true);
  };

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?",
    );
    if (confirmDelete) {
      try {
        await deleteVenue(id);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete venue. Please try again!");
      }
    }
  }

  return (
    <div className="mx-auto my-20 w-5/6 border px-10 py-8">
      <h2 className="mb-4 text-xl font-bold">My Venues</h2>
      {message && (
        <div className="text-green-500 mb-4 text-center">{message}</div>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {venues.map((venue, id) => (
          <div key={id} className="border p-4 shadow-md">
            <div className="flex flex-col items-center justify-center md:flex-row">
              <div className="mb-4 flex w-full flex-col items-center justify-between md:mb-0 md:mr-4 md:w-1/2">
                <Link to={`/venue/${venue.id}`}>
                  <img
                    className="mb-4 h-36 w-36 object-cover"
                    src={venue.media[0].url}
                    alt={venue.media[0].alt}
                  />
                  <h3 className="text-l mb-4 break-words text-center font-semibold md:mb-0">
                    {venue.name}
                  </h3>
                </Link>
              </div>
              <div className="flex w-full flex-col items-center justify-between md:w-1/2">
                <div className="my-auto flex flex-col items-center justify-center gap-3">
                  <button
                    className="mb-2 border px-8 py-1 font-bold md:mb-0 md:mr-2"
                    onClick={() => handleEdit(venue)}
                  >
                    Edit Venue
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="mb-2 border px-8 py-1 font-bold md:mb-0 md:mr-2"
                  >
                    Delete
                  </button>
                  <Link to={`/venue/bookings/${venue.id}`}>
                    <button className="border px-8 py-1 font-bold">
                      View Bookings
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for updating venue */}
      {isModalOpen && (
        <UpdateVenue
          venueData={updateVenue}
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MyVenues;
