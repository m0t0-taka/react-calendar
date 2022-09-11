import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";

const MonthIdx = createContext();

// consumer側
export const useMonthIndexContext = () => {
  return useContext(MonthIdx);
};

// provider側
export const MonthIndexProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  const monthIdxValue = {
    monthIndex,
    setMonthIndex,
  };

  return (
    <MonthIdx.Provider value={monthIdxValue}>{children}</MonthIdx.Provider>
  );
};
