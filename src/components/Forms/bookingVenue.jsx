import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";

import bookVenue from "../API/Venue/bookVenue";

function Booking({ data, id, bookedDates }) {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numGuests, setNumGuests] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setPricePerNight(data.price);
    }
  }, [data]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice =
        pricePerNight *
        Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [checkInDate, checkOutDate, pricePerNight]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setCheckOutDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
    setTotalDays(1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      venueId: id,
      dateFrom: checkInDate.toISOString(),
      dateTo: checkOutDate.toISOString(),
      guests: parseInt(numGuests),
    };

    try {
      const response = await bookVenue(bookingData);
      window.alert("Booking successful!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }

    const days = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );
    setTotalDays(days);
  };

  useEffect(() => {
    const days = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );
    setTotalDays(days);
  }, [checkInDate, checkOutDate]);

  return (
    <form className="border" onSubmit={handleFormSubmit}>
      <div>
        <p>Check in</p>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          showIcon
          excludeDates={bookedDates}
          dayClassName={(date) =>
            bookedDates.some(
              (bookedDate) =>
                new Date(bookedDate).toDateString() === date.toDateString(),
            )
              ? "bg-orange text-white"
              : ""
          }
        />
      </div>
      <div>
        <p>Check out</p>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate}
          showIcon
          excludeDates={bookedDates}
          dayClassName={(date) =>
            bookedDates.some(
              (bookedDate) =>
                new Date(bookedDate).toDateString() === date.toDateString(),
            )
              ? "bg-orange text-white"
              : ""
          }
        />
      </div>
      <div>
        <p>How many guests will you be?</p>
        <input
          type="number"
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          max={data.maxGuests}
        />
      </div>
      <div>
        <p>Total days: {totalDays}</p>
        <h3>Total: {totalPrice}$</h3>
      </div>
      <button type="submit" className="my-10 flex border px-8 py-1 font-bold">
        Book Now
      </button>
    </form>
  );
}

export default Booking;
