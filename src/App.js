import { getMonth } from "./util";
import { CalendarHeader } from "./components/CalendarHeader";
import { Sidebar } from "./components/Sidebar";
import { Month } from "./components/Month";

function App() {
  console.table(getMonth(8));
  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month />
        </div>
      </div>
    </>
  );
}

export default App;
