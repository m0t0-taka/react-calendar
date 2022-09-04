import React from "react";

const GlobalContext = React.createContext({
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
});

export default GlobalContext;
