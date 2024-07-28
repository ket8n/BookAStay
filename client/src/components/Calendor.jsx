import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Calendar = ({ setCheckIn, setCheckOut }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    const newSelection = ranges.selection;
    setState([newSelection]);
    setCheckIn(newSelection.startDate.toDateString());
    setCheckOut(newSelection.endDate.toDateString());
  };

  return (
    <div className="p-4">
      <div className=" max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <DateRange
          onChange={handleSelect}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          ranges={state}
          direction="horizontal"
          minDate={new Date()}
        />
      </div>
    </div>
  );
};

export default Calendar;
