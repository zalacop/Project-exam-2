import React from "react";

const Spinner = () => {
  return (
    <div className="mt-20 flex items-center justify-center space-x-4">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-dark-green"></div>
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-orange"></div>
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-light-green"></div>
    </div>
  );
};

export default Spinner;
