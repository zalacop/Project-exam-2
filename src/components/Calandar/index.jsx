import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calandar.css";

function Calendar({ startDate, endDate, isRangeBooked }) {
  return (
    <div className="z-40 mx-auto mb-20 flex justify-center">
      <DatePicker
        selected={startDate}
        selectsRange
        inline
        minDate={new Date()}
        monthsShown={2}
        className="text-white px-3 py-2 text-sm font-semibold"
        dayClassName={(date) => {
          const isBooked = isRangeBooked(date, date);
          const isStartDate =
            startDate && date.getTime() === startDate.getTime();
          const isEndDate = endDate && date.getTime() === endDate.getTime();
          const isCurrentlySelected = isStartDate || isEndDate;

          let classes = "";

          if (isBooked) {
            classes += " booked-date bg-orange text-white";
          } else if (isCurrentlySelected) {
            classes += " bg-orange text-white";
          }

          classes += " custom-hover-none";

          return classes;
        }}
      />
    </div>
  );
}

export default Calendar;
