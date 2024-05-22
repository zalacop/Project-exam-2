import { Link } from "react-router-dom";
import Rating from "../Rating";

function VenueCard({ venues }) {
  return (
    <div className="mx-auto my-6 w-3/4">
      {venues.map((venue, index) => (
        <div
          key={`${venue.id}-${index}`}
          className="mb-4 flex flex-col border p-4 sm:flex-row"
        >
          <div className="mb-4 w-full sm:mb-0 sm:w-1/3">
            {venue.media && venue.media.length > 0 && (
              <img
                src={venue.media[0].url}
                alt={venue.location.city}
                className="h-full w-full object-cover"
                style={{ height: "220px" }}
              />
            )}
            <p className="mt-2 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
              {venue.location.city}
            </p>
          </div>
          <div className="my-auto ml-5 w-full pl-5 sm:ml-4 sm:w-2/3">
            <h2 className="break-all text-lg font-semibold">{venue.name}</h2>
            <div className="mt-2 flex items-center">
              <Rating rating={venue.rating} />
            </div>
            <p className="mt-2 break-all mb-5">
              {venue.description.length > 300
                ? `${venue.description.substring(0, 300)}...`
                : venue.description}
            </p>
            <Link to={`/venue/${venue.id}`}>
              <button className="mx-auto w-max border px-8 py-1 font-bold">
                Show More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VenueCard;
