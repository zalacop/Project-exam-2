import { Link } from "react-router-dom";
import formatDate from "../../utils/dateFormat";
import deleteBooking from "../API/Venue/deleteBooking";

function MyBookings({ bookings }) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?",
    );
    if (confirmDelete) {
      try {
        await deleteBooking(id);
        window.location.reload();
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete booking. Please try again!");
      }
    }
  }

  function calculateTotalPrice(price, dateFrom, dateTo) {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const timeDifference = endDate - startDate;
    const daysBooked = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return price * daysBooked;
  }

  return (
    <div className="mx-auto mb-20 w-5/6 border px-10 py-8">
      <h2 className="mb-4 text-xl font-bold">My Bookings</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {bookings.map((booking, id) => (
          <div
            key={id}
            className="flex flex-col items-center border p-4 shadow-md md:flex-row"
          >
            <div className="mb-4 flex w-full justify-center md:mb-0 md:mr-4 md:w-1/3">
              <Link to={`/venue/${booking.venue.id}`}>
                <img
                  src={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt}
                  className="h-36 w-36"
                />
              </Link>
            </div>
            <div className="ml-2 flex w-full flex-col items-center gap-2 md:w-2/3 md:items-start">
              <h3 className="mb-2 text-center font-semibold md:text-left">
                {booking.venue.name}
              </h3>
              <p className="text-center md:text-left">
                Booked from {formatDate(booking.dateFrom)} to{" "}
                {formatDate(booking.dateTo)}
              </p>
              <p className="text-center md:text-left">
                Number of Guests: {booking.guests}
              </p>
              <p className="text-center md:text-left">
                Total Price: $
                {calculateTotalPrice(
                  booking.venue.price,
                  booking.dateFrom,
                  booking.dateTo,
                )}
              </p>
              <button
                onClick={() => handleDelete(booking.id)}
                className="border px-8 py-1 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
