import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ startDate, endDate, isRangeBooked, disabledDates }) => {
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
          return isBooked
            ? "booked-date bg-orange"
            : isCurrentlySelected
              ? "bg-orange"
              : "";
        }}
        onSelect={null}
      />
    </div>
  );
};

export default Calendar;
