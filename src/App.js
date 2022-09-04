import { useState, useEffect, useContext } from "react";

import { getMonth } from "./util";
import { CalendarHeader } from "./components/CalendarHeader";
import { Month } from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import { EventModal } from "./components/EventModal";

import dayjs from "dayjs";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const { showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal daySelected={daySelected} />}
      <div className="h-screen flex flex-col">
        <CalendarHeader monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
        <div className="flex flex-1 p-2">
          <Month month={currentMonth} setDaySelected={setDaySelected} />
        </div>
      </div>
    </>
  );
}

export default App;
