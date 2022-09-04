import React from "react";

const GlobalContext = React.createContext({
  // monthIndex: 0,
  // setMonthIndex: (index) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
});

export default GlobalContext;
