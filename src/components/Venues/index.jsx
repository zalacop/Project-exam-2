import { Link } from "react-router-dom";
import Rating from "../Rating";
import placeholder from "./../../assets/image-2935360_1920.png";

function VenueCard({ venues }) {
  return (
    <div className="mx-auto my-6">
      {venues.map((venue, index) => {
        const firstImage =
          venue.media && venue.media.length > 0
            ? { url: venue.media[0].url, alt: venue.location.city }
            : { url: placeholder, alt: "Placeholder image" };

        return (
          <div
            key={`${venue.id}-${index}`}
            className="mx-auto mb-4 flex w-[80%] max-w-[1000px] flex-col border p-4 sm:flex-row"
          >
            <div className="mb-4 w-full sm:mb-0 sm:w-1/3">
              <img
                src={firstImage.url}
                alt={firstImage.alt}
                className="h-full w-full object-cover"
                style={{ height: "220px" }}
              />
              <p className="mt-2 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
                {venue.location.city}
              </p>
            </div>
            <div className="my-auto ml-5 w-full pl-5 sm:ml-4 sm:w-2/3">
              <h2 className="break-all text-lg font-semibold">{venue.name}</h2>
              <div className="mt-2 flex items-center">
                <Rating rating={venue.rating} />
              </div>
              <p className="mb-5 mt-2 break-all">
                {venue.description.length > 300
                  ? `${venue.description.substring(0, 300)}...`
                  : venue.description}
              </p>
              <Link to={`/venue/${venue.id}`}>
                <button className="mx-auto w-max border-4 border-dark-green bg-dark-green px-8 py-1 font-semibold text-background">
                  Show More
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VenueCard;
