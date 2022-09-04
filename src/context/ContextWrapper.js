import React, { useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";

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
  console.log(storageEvents);
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextWrapper = (props) => {
  const [savedEvents, dispatchCalEvent] = useReducer(
    saveEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    // 以下構文でlocalStorageに保存
    // localStorage.setItem('key', 'value')
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <GlobalContext.Provider
      value={{
        dispatchCalEvent,
        savedEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
