import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function Rating({ rating }) {
  const maxStars = 5;
  const filledStars = Math.min(maxStars, Math.max(0, Math.floor(rating)));
  const emptyStars = maxStars - filledStars;
  let stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<FaStar key={`filled-${i}`} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} />);
  }

  return <span className="my-2 flex text-lg text-orange">{stars}</span>;
}

export default Rating;
