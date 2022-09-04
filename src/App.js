import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { getMonth } from "./util";
import { CalendarHeader } from "./components/CalendarHeader";
import { Month } from "./components/Month";
import { EventModal } from "./components/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <>
      {showEventModal && (
        <EventModal
          daySelected={daySelected}
          setShowEventModal={setShowEventModal}
          selectedEvent={selectedEvent}
        />
      )}
      <div className="h-screen flex flex-col">
        <CalendarHeader monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
        <div className="flex flex-1 p-2">
          <Month
            month={currentMonth}
            setDaySelected={setDaySelected}
            setShowEventModal={setShowEventModal}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
      </div>
    </>
  );
}

export default App;
