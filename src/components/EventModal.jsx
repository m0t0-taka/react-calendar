import React, { useState } from "react";
import { MdDeleteForever, MdClose } from "react-icons/md";
import { IconContext } from "react-icons";

export const EventModal = (props) => {
  const { daySelected, setShowEventModal, selectedEvent, dispatchCalEvent } =
    props;
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const handleSubmit = (e) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();
    const calendarEvent = {
      title: title,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  console.log(selectedEvent);

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 pt-2 pb-1 flex justify-between">
          <div>
            <p className="text-gray-600 text-lg font-medium">
              {daySelected.format("MMMM DD日 dddd")}
            </p>
          </div>
          <div>
            <IconContext.Provider value={{ color: "#9ca3af", size: "25px" }}>
              {selectedEvent && (
                <button
                  className="px-3"
                  onClick={() => {
                    dispatchCalEvent({
                      type: "delete",
                      payload: selectedEvent,
                    });
                    setShowEventModal(false);
                  }}
                >
                  <MdDeleteForever />
                </button>
              )}
              <button onClick={() => setShowEventModal(false)}>
                <MdClose />
              </button>
            </IconContext.Provider>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <input
              type="text"
              name="title"
              placeholder="タイトル"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="px-5 py-2 w-40 bg-white rounded-lg text-lg font-medium outline outline-offset-2 outline-1 outline-gray-200">
              <div className="flex text-gray-600">
                <select
                  name="hours"
                  className="bg-transparent text-xl appearance-none outline-none"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <span className="text-xl mr-3">:</span>
                <select
                  name="minutes"
                  className="bg-transparent text-xl appearance-none outline-none mr-4"
                >
                  <option value="0">00</option>
                  <option value="30">30</option>
                </select>
                <select
                  name="ampm"
                  className="bg-transparent text-xl appearance-none outline-none"
                >
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center p-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            {selectedEvent === null ? "保存" : "更新"}
          </button>
        </footer>
      </form>
    </div>
  );
};
