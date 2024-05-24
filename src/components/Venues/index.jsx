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
            <div className="smy-auto mb-4 w-full sm:mb-0 sm:w-1/3">
              <img
                src={firstImage.url}
                alt={firstImage.alt}
                className="h-full w-full object-cover"
                style={{ height: "220px" }}
              />
              <p className="mt-2 max-w-full overflow-hidden overflow-ellipsis text-center">
                {venue.location.city}
              </p>
            </div>
            <div className="my-auto ml-5 w-full pl-5 sm:ml-4 sm:w-2/3">
              <h2 className="mr-5 break-all text-lg font-semibold">
                {venue.name}
              </h2>
              <div className="mt-2 flex items-center">
                <Rating rating={venue.rating} />
              </div>
              {venue && (
                <div className="mr-5 max-w-full">
                  <p
                    className="mx-auto my-2 text-lg"
                    style={{ overflowWrap: "break-word" }}
                  >
                    {venue.description.length > 300 ? (
                      <>
                        {venue.description.slice(0, 300)}
                        <span>...</span>
                      </>
                    ) : (
                      venue.description.split(" ").map((word, index) =>
                        word.length > 15 ? (
                          <span key={index} className="break-all">
                            {word}
                          </span>
                        ) : (
                          <span key={index}>{word} </span>
                        ),
                      )
                    )}
                  </p>
                </div>
              )}

              <Link to={`/venue/${venue.id}`}>
                <button className="mx-auto w-max border-4 border-dark-green bg-dark-green px-5 py-1 font-semibold text-background">
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
