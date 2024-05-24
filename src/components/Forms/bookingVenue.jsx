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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const confirmBooking = window.confirm(
      "Are you sure you want to book this venue?",
    );

    if (!confirmBooking) {
      return;
    }

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
      window.alert("Booking was unsuccessful! Please try again later.");
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

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return (
      <div className="my-10 flex flex-col gap-2 border py-10 shadow-lg">
        <h2 className="mx-auto text-lg font-bold">
          Would you like to book this venue?
        </h2>
        <p className="mt-2 text-center">
          Please log in to proceed with the booking.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mx-auto my-auto flex flex-col gap-2 border px-20 py-5 shadow-lg"
      onSubmit={handleFormSubmit}
    >
      <h2 className="mx-auto text-lg font-bold">Book this venue</h2>
      <div className="mx-auto">
        <p className="my-2">Check in</p>
        <DatePicker
          className="border"
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
      <div className="mx-auto">
        <p className="my-2">Check out</p>
        <DatePicker
          className="border"
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
      <div className="mx-auto">
        <p className="my-2">Number of guests</p>
        <input
          className="w-full max-w-xs border px-3 py-1"
          type="number"
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          max={data.maxGuests}
        />
      </div>
      <div className="mx-auto mt-3">
        <span className="flex gap-2">
          <p>Total days: </p>
          <p>{totalDays}</p>
        </span>
        <span className="flex items-center gap-2">
          <h3 className="font-lg font-semibold">Total:</h3>
          <p className="my-auto pt-1">{totalPrice}$</p>
        </span>
      </div>
      <button
        type="submit"
        className="mx-auto w-max border-4 border-dark-green bg-dark-green px-8 py-1 font-semibold text-background"
      >
        Book Now
      </button>
    </form>
  );
}

export default Booking;
