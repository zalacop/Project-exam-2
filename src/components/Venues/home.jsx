import React from "react";
import useApi from "../../hooks/useFetchApi";
import holidazeUrls from "../../utils/url";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

function FetchVenues() {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useApi(`${holidazeUrls.urlVenues}/?_owner=true&_bookings=true`);

  if (isLoading) {
    return {
      norwayCities: [],
      spainCities: [],
      germanyCities: [],
      isLoading: true,
      isError: false,
    };
  }

  if (isError || !responseData) {
    return {
      norwayCities: [],
      spainCities: [],
      germanyCities: [],
      isLoading: false,
      isError: true,
    };
  }

  const { data } = responseData;

  const categorizedData = {
    norwayCities: [],
    spainCities: [],
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
          categorizedData.norwayCities.push({
            id: venue.id,
            city,
            image: firstImage,
          });
          break;
        case country === "Spain":
          categorizedData.spainCities.push({
            id: venue.id,
            city,
            image: firstImage,
          });
          break;
        default:
          break;
      }
    }
  });

  return { ...categorizedData, isLoading: false, isError: false };
}

function HomeVenues() {
  const { norwayCities, spainCities, isLoading, isError } = FetchVenues();

  if (isLoading) {
    return <Spinner />;
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
      <section className="mx-auto my-8 max-w-[1400px]">
        <h2 className="my-5 ml-20 pl-20 text-2xl font-bold">Norway</h2>
        <div className="slider-container mx-auto w-3/4">
          <Slider {...settings}>
            {norwayCities.map((venue, index) => (
              <div key={`${venue.city}-${index}`} className="h-full">
                <Link to={`/venue/${venue.id}`}>
                  <div className="mx-2 h-64">
                    <img
                      src={venue?.image}
                      alt={venue.city}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mx-3 mt-3 font-semibold">{venue.city}</h3>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {spainCities.length > 0 && (
        <section className="mx-auto my-8 max-w-[1400px]">
          <h2 className="my-5 ml-20 pl-20 text-2xl font-bold">Spain</h2>
          <div className="mx-auto w-3/4">
            <Slider {...settings}>
              {spainCities.map((venue, index) => (
                <div key={`${venue.city}-${index}`} className="h-full">
                  <Link to={`/venue/${venue.id}`}>
                    <div className="mx-2 h-64">
                      <img
                        src={venue?.image}
                        alt={venue.city}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mx-3 mt-3 font-semibold">{venue.city}</h3>
                  </Link>
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
