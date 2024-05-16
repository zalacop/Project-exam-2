import formatDate from "../../utils/dateFormat";

function MyBookings({ bookings }) {
  return (
    <>
      <h2>My Bookings</h2>
      <div>
        {bookings.map((booking, id) => (
          <div key={id}>
            <div>
              <img
                src={booking.venue.media[0].url}
                alt={booking.venue.media[0].alt}
              />
            </div>
            <div>
              <h3>{booking.name}</h3>
              <p>
                Booked from {formatDate(booking.dateFrom)} to{" "}
                {formatDate(booking.dateTo)}
              </p>
              <p>Number of Guests: {booking.guests}</p>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyBookings;
