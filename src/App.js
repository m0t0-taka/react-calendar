import { useState, useEffect, useReducer, createContext } from "react";
import dayjs from "dayjs";

import { getMonth } from "./util";
import { CalendarHeader } from "./components/CalendarHeader";
import { Month } from "./components/Month";
import { EventModal } from "./components/EventModal";

export const MonthIdx = createContext();

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

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthIdxValue = {
    monthIndex,
    setMonthIndex,
  };

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
        <MonthIdx.Provider value={monthIdxValue}>
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
        </MonthIdx.Provider>
      </div>
    </>
  );
}

export default App;
