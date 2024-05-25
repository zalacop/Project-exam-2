import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-dark-green"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-light-green"></div>
    </div>
  );
};

export default Spinner;
