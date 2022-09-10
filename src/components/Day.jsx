import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export const Day = (props) => {
  const {
    day,
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
    savedEvents,
  } = props;
  const [dayEvents, setDayEvents] = useState([]);

  // 今日の日付を色付けする
  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full leading-4 mb-1"
      : "";
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
        <p className={`text-sm p-1 text-center" ${getCurrentDayClass()}`}>
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
            className={`bg-neutral-200 p-1 mx-0.5 text-gray-600 text-sm rounded mb-1 truncate flex justify-between`}
          >
            <div>{evt.title}</div>
            <div>{evt.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
