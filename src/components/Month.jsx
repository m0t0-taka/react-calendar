import React from "react";
import { Day } from "./Day";
import { Week } from "./Week";

export const Month = (props) => {
  const { month } = props;
  return (
    <div className="flex-1">
      <div className="grid grid-cols-7 grid-rows-1">
        <Week />
      </div>
      <div className="min-h-[96%] grid grid-cols-7 grid-rows-6">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
