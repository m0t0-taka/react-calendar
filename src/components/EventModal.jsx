import React, { useState, useEffect, useCallback } from "react";
import { MdDeleteForever, MdClose } from "react-icons/md";
import { IconContext } from "react-icons";

export const EventModal = (props) => {
  const { daySelected, setShowEventModal, selectedEvent, dispatchCalEvent } =
    props;
  const [titleList, setTitleList] = useState([]);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [validation, setValidation] = useState("");
  const [hour, setHour] = useState(
    selectedEvent ? selectedEvent.time.slice(0, -5) : "6"
  );
  const [minute, setMinute] = useState(
    selectedEvent ? selectedEvent.time.slice(-4, -2) : "00"
  );
  const [amPm, setAmPm] = useState(
    selectedEvent ? selectedEvent.time.slice(-2) : "AM"
  );
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : "");
  const [checkedItem, setCheckedItem] = useState([]);

  const checkList = ["DY", "FM", "その他"];

  const selectTitle = useCallback(() => {
    const storageSchedule = localStorage.getItem("savedSchedules");
    const parsedSchedules = storageSchedule ? JSON.parse(storageSchedule) : [];
    parsedSchedules.unshift({
      id: 1,
      title: "選択してください",
    });
    setTitleList(parsedSchedules);
  }, []);

  useEffect(() => {
    selectTitle();
  }, [selectTitle]);

  const handleSubmit = (e) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();
    if (!title) {
      setValidation("タイトルを選択してください");
    } else {
      const calendarEvent = {
        id: selectedEvent ? selectedEvent.id : Date.now(),
        day: daySelected.valueOf(),
        title: title,
        time: time,
      };
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }
      setShowEventModal(false);
    }
  };

  const handleChangeHour = (e) => {
    setHour(e.target.value);
  };
  const handleChangeMinute = (e) => {
    setMinute(e.target.value);
  };
  const handleChangeAmPm = (e) => {
    setAmPm(e.target.value);
  };
  useEffect(() => {
    setTime(`${hour}:${minute}${amPm}`);
  }, [hour, minute, amPm]);

  const handleChange = (e) => {
    if (checkedItem.includes(e.target.value)) {
      setCheckedItem(checkedItem.filter((item) => item !== e.target.value));
    } else {
      if (checkedItem != "") return;
      setCheckedItem([...checkedItem, e.target.value]);
    }
  };

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
          <div className="grid grid-cols-1/5 items-end gap-y-2">
            <label className="block mt-3 mb-0 ml-2 text-base font-medium text-gray-600">
              タグ
            </label>
            <div className="flex ml-2">
              {checkList.map((cList, i) => (
                <div key={i} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    value={cList}
                    onChange={handleChange}
                    checked={checkedItem.includes(cList)}
                    className="w-4 h-4 accent-orange-300 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-orange-500 focus:ring-2"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-600">
                    {cList}
                  </label>
                </div>
              ))}
            </div>

            <label className="block mt-3 mb-0 ml-2 text-base font-medium text-gray-600">
              タイトル
            </label>

            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-600 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {(() => {
                if (checkedItem == "") {
                  return titleList.map((tList, i) => (
                    <option value={tList.title} key={tList.id}>
                      {tList.title}
                    </option>
                  ));
                } else {
                  if (checkedItem.includes("DY")) {
                    return titleList.map(
                      (tList, i) =>
                        (tList.title.includes("DY") ||
                          tList.title.includes("選択してください")) && (
                          <option value={tList.title} key={tList.id}>
                            {tList.title}
                          </option>
                        )
                    );
                  }
                  if (checkedItem.includes("FM")) {
                    return titleList.map(
                      (tList, i) =>
                        (tList.title.includes("FM") ||
                          tList.title.includes("選択してください")) && (
                          <option value={tList.title} key={tList.id}>
                            {tList.title}
                          </option>
                        )
                    );
                  }
                  if (checkedItem.includes("その他")) {
                    return titleList.map(
                      (tList, i) =>
                        !(
                          tList.title.includes("DY") ||
                          tList.title.includes("FM")
                        ) && (
                          <option value={tList.title} key={tList.id}>
                            {tList.title}
                          </option>
                        )
                    );
                  }
                }
              })()}
            </select>

            <p className="text-rose-600">{validation ? validation : ""}</p>
            <div className="flex-none mt-3 ml-2 text-base font-medium text-gray-600">
              時刻
            </div>
            <div className="bg-gray-50 border border-gray-300 flex-initial px-7 py-2 w-40 rounded-lg text-lg font-base justify-self-center">
              <div className="flex text-gray-600">
                <select
                  name="hours"
                  className="bg-transparent text-lg appearance-none outline-none"
                  value={hour}
                  onChange={handleChangeHour}
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
                <span className="text-lg mx-2">:</span>
                <select
                  name="minutes"
                  className="bg-transparent text-lg appearance-none outline-none mr-4"
                  value={minute}
                  onChange={handleChangeMinute}
                >
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
                <select
                  name="amPm"
                  className="bg-transparent text-lg appearance-none outline-none"
                  value={amPm}
                  onChange={handleChangeAmPm}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center p-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-orange-200 hover:bg-orange-300 px-6 py-2 rounded text-yellow-700"
          >
            {selectedEvent === null ? "保存" : "更新"}
          </button>
        </footer>
      </form>
    </div>
  );
};
