import React from "react";
import HomeVenues from "../../components/Venues/home";
import image from "../../assets/P1088557.jpg";

function Home() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <img
          src={image}
          alt="Image of Ljubljana"
          className="home-image w-full opacity-90"
        />
      </div>
      <HomeVenues />
    </>
  );
}

export default Home;
