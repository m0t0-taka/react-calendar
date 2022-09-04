import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import React, { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

dayjs.locale(ja);

export const CalendarHeader = (props) => {
  const { monthIndex, setMonthIndex } = props;
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handelNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    // 現在の月を取得
    setMonthIndex(dayjs().month());
  };
  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">月間カレンダー</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        今日
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-10">
          <MdChevronLeft />
        </span>
      </button>
      {/* <div> */}
      <h2 className="mx-1 text-xl text-gray-500 font-bold w-32">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY年 MMM")}
      </h2>
      {/* </div> */}

      <button onClick={handelNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
    </header>
  );
};
