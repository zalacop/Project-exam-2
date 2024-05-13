import React from "react";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const { norwayCities, spainCities, usaStates, isLoading, isError } = FetchVenues();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div>
      <section className="my-8">
        <h2 className="font-bold text-2xl ml-5 pl-5 my-5">Norway</h2>
        <div className="w-3/4 mx-auto slider-container">
          <Slider {...settings}>
            {norwayCities.map((venue, index) => (
              <div key={`${venue.city}-${index}`} className="h-full">
                <div className="h-64 mx-2">
                  <img
                    src={venue?.image}
                    alt={venue.city}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-3 mx-3 font-semibold">{venue.city}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {spainCities.length > 0 && (
        <section className="my-8 py-5">
          <h2 className="font-bold text-2xl ml-5 pl-5 my-5">Spain</h2>
          <div className="w-3/4 mx-auto">
            <Slider {...settings}>
              {spainCities.map((venue, index) => (
                <div key={`${venue.city}-${index}`} className="h-full">
                  <div className="h-64 mx-2">
                    <img
                      src={venue?.image}
                      alt={venue.city}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-3 mx-3 font-semibold">{venue.city}</h3>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {usaStates.length > 0 && (    
        <section className="my-8 py-5">
          <h2 className="font-bold text-2xl ml-5 pl-5 my-5">USA</h2>
          <div className="w-3/4 mx-auto">
            <Slider {...settings}>
              {usaStates.map((venue, index) => (
                <div key={`${venue.city}-${index}`} className="h-full">
                  <div className="h-64 mx-2">
                    <img
                      src={venue?.image}
                      alt={venue.city}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-3 mx-3 font-semibold">{venue.city}</h3>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
    </div>
  );
}

export default HomeVenues;

