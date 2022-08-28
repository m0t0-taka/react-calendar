import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export const CalendarHeader = () => {
  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={""} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={""}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <MdChevronLeft />
        </span>
      </button>
      <button onClick={""}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
    </header>
  );
};
