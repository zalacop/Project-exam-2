function MyVenues({ venues }) {
  return (
    <>
      <h2>My Venues</h2>
      <div>
        {venues.map((venue, id) => (
          <div key={id}>
            <div>
              <img src={venue.media[0].url} alt={venue.media[0].alt} />
              <h3>{venue.name}</h3>
            </div>
            <div>
              <button>Edit Venue</button>
              <button>Delete</button>
              <button>View Bookings</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyVenues;
