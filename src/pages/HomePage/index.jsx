import React from "react";
import HomeVenues from "../../components/Venues";
import image from "../../assets/P1088557.jpg";

function Home() {
  return (
    <>
      <img src={image} alt="Image of Ljubljana." />
      <HomeVenues />
    </>
  );
}

export default Home;
