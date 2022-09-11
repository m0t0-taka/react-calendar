import { useState, useEffect, useReducer } from "react";
import dayjs from "dayjs";

import { getMonth } from "../util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import { EventModal } from "./EventModal";
import { useMonthIndexContext } from "../contexts/MonthContext";

const saveEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { monthIndex } = useMonthIndexContext();

  // 第2引数がinitialValue, 第3引数がinitialFunction
  const [savedEvents, dispatchCalEvent] = useReducer(
    saveEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  useEffect(() => {
    // 以下構文でlocalStorageに保存
    // localStorage.setItem('key', 'value')
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <>
      {showEventModal && (
        <EventModal
          daySelected={daySelected}
          setShowEventModal={setShowEventModal}
          selectedEvent={selectedEvent}
          dispatchCalEvent={dispatchCalEvent}
        />
      )}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1 p-2">
          <Month
            month={currentMonth}
            setDaySelected={setDaySelected}
            setShowEventModal={setShowEventModal}
            setSelectedEvent={setSelectedEvent}
            savedEvents={savedEvents}
          />
        </div>
      </div>
    </>
  );
};
