import React from "react";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

function FetchVenues() {
  const { data, isLoading, isError } = useApi(
    holidazeUrls.urlVenues + "?_owner=true&_bookings=true",
  );

  if (isLoading) {
    return {
      norwayCities: [],
      spainCities: [],
      usaStates: [],
      isLoading: true,
      isError: false,
    };
  }

  if (isError) {
    return {
      norwayCities: [],
      spainCities: [],
      usaStates: [],
      isLoading: false,
      isError: true,
    };
  }

  const categorizedData = {
    norwayCities: [],
    spainCities: [],
    usaStates: [],
  };

  data.forEach((venue) => {
    const city = venue.location.city;
    const country = venue.location.country;
    const continent = venue.location.continent;
    const firstImage =
      venue.media && venue.media.length > 0 ? venue.media[0].url : null;

    if (country !== null && country !== undefined) {
      switch (true) {
        case country.includes("Norway"):
        case country.includes("Norge"):
          categorizedData.norwayCities.push({ city, image: firstImage });
          break;
        case country === "Spain":
          categorizedData.spainCities.push({ city, image: firstImage });
          break;
        case country.includes("USA"):
        case country.includes("America"):
        case continent &&
          (continent.includes("America") || continent.includes("USA")):
          categorizedData.usaStates.push({ city, image: firstImage });
          break;
        default:
          break;
      }
    }
  });

  return { ...categorizedData, isLoading: false, isError: false };
}

function HomeVenues() {
  const { norwayCities, spainCities, usaStates, isLoading, isError } =
    FetchVenues();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div>
      <section>
        <h2>Norway</h2>
        <ul>
          {norwayCities.map((venue, index) => (
            <li key={`${venue.city}-${index}`}>
              <img src={venue.image} alt={venue.city} />
              {venue.city}
            </li>
          ))}
        </ul>
      </section>
      {spainCities.length > 0 && (
        <section>
          <h2>Spain</h2>
          <ul>
            {spainCities.map((venue, index) => (
              <li key={`${venue.city}-${index}`}>
                <img src={venue.image} alt={venue.city} />
                {venue.city}
              </li>
            ))}
          </ul>
        </section>
      )}
      {usaStates.length > 0 && (
        <section>
          <h2>USA</h2>
          <ul>
            {usaStates.map((venue, index) => (
              <li key={`${venue.city}-${index}`}>
                <img src={venue.image} alt={venue.city} />
                {venue.city}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default HomeVenues;
