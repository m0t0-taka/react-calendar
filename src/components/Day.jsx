import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMonthIndexContext } from "../contexts/MonthContext";

export const Day = (props) => {
  const {
    day,
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
    savedEvents,
  } = props;

  const { monthIndex } = useMonthIndexContext();
  const [dayEvents, setDayEvents] = useState([]);

  // 今日の日付を色付けする
  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-orange-300 text-white rounded-full mb-0"
      : "";
  };

  // ヘッダーの表示月と表示している日付の月が一致しない場合
  // ヘッダーの表示月
  const headerMonth = dayjs(new Date(dayjs().year(), monthIndex)).format(
    "MM-YY"
  );
  // 表示している日付の月
  const calendarMonth = day.format("MM-YY");
  const notCurrentMonthDay = () => {
    return headerMonth !== calendarMonth ? "text-gray-300" : "";
  };

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        <p
          className={`text-sm p-1 text-center leading-4 ${getCurrentDayClass()} ${notCurrentMonthDay()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-orange-100 p-1 mx-0.5 text-yellow-700 text-sm rounded mb-1 truncate flex justify-between`}
          >
            <div>{evt.title}</div>
            <div>{evt.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
