import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useMonthIndexContext } from "../contexts/MonthContext";

dayjs.locale(ja);

export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useMonthIndexContext();

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

  let navigate = useNavigate();

  const handleTitleList = () => {
    navigate("/title");
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
      <h2 className="mx-1 text-xl text-gray-500 font-bold w-32">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY年 MMM")}
      </h2>
      <button onClick={handelNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
      <button
        onClick={handleTitleList}
        className="border rounded py-2 px-4 ml-5"
      >
        登録タイトル
      </button>
    </header>
  );
};
