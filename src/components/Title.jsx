import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdModeEditOutline,
  MdDeleteOutline,
  MdArrowBackIosNew,
} from "react-icons/md";

import { IconContext } from "react-icons";
import { useEffect } from "react";
import { EditModal } from "./EditModal";
import { ConfirmModal } from "./ConfirmModal";

const registerSchedule = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((data) => (data.id === payload.id ? payload : data));
    case "delete":
      return state.filter((data) => data.id !== payload.id);
    default:
      return null;
  }
};

const initSchedules = () => {
  const storageSchedule = localStorage.getItem("savedSchedules");
  const parsedSchedules = storageSchedule ? JSON.parse(storageSchedule) : [];
  return parsedSchedules;
};

export const Title = () => {
  const [title, setTitle] = useState("");
  const [validation, setValidation] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(false);
  const [schedules, dispatchScheduleTitle] = useReducer(
    registerSchedule,
    [],
    initSchedules
  );
  const handleRegister = (e) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();
    if (!title) {
      setValidation("タイトルを入力してください");
    } else {
      const scheduleTitle = {
        id: Date.now(),
        title: title,
      };
      dispatchScheduleTitle({ type: "push", payload: scheduleTitle });
    }
    setTitle("");
  };

  // 削除ボタン押下でモーダル表示
  useEffect(() => {
    if (selectedDelete) {
      setConfirmModal(true);
    }
  }, [selectedDelete]);

  // 編集ボタン押下でモーダル表示
  useEffect(() => {
    if (selectedTitle) {
      setEditModal(true);
    }
  }, [selectedTitle]);

  useEffect(() => {
    localStorage.setItem("savedSchedules", JSON.stringify(schedules));
  }, [schedules]);

  let navigate = useNavigate();

  const handleBackCalendar = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-center mx-auto my-5">
      <div className="flex flex-col">
        <div className="flex my-3">
          <div className="flex-none w-40 mt-1">
            <button onClick={handleBackCalendar}>
              <MdArrowBackIosNew />
            </button>
          </div>
          <div className="flex-1">
            <p className="block text-lg font-medium text-gray-900 dark:text-gray-800">
              登録タイトル一覧
            </p>
          </div>
        </div>
        <div className="flex my-7">
          <div className="flex-1 w-48 mr-2">
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="タイトル"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-rose-600">{validation ? validation : ""}</p>
          </div>
          <div className="flex-none w-24 ml-5">
            <button
              type="submit"
              onClick={handleRegister}
              className="bg-orange-200 hover:bg-orange-300 text-yellow-700 px-4 py-2 rounded-md shadow-sm"
            >
              追加登録
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="border-b border-gray-200 shadow">
            <table className="divide-y divide-gray-300 table-fixed">
              <thead className="bg-gray-50">
                <tr className="">
                  <th className="w-80 px-6 py-2 text-base text-gray-500">
                    タイトル
                  </th>
                  <th className="px-6 py-2 text-base text-gray-500">編集</th>
                  <th className="px-6 py-2 text-base text-gray-500">削除</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {schedules.map((data, i) => (
                  <tr className="whitespace-nowrap" key={i}>
                    <td className="w-80 px-6 py-4 text-base text-gray-900">
                      {data.title}
                    </td>
                    <td className="px-6 py-4 text-center leading-4">
                      <IconContext.Provider
                        value={{ color: "#3b82f6", size: "16px" }}
                      >
                        <button onClick={() => setSelectedTitle(data)}>
                          {/* {console.log(data)} */}
                          <MdModeEditOutline />
                        </button>
                      </IconContext.Provider>
                    </td>
                    <td className="px-6 py-4 text-center leading-4">
                      <IconContext.Provider
                        value={{ color: "#ec4899", size: "16px" }}
                      >
                        <button onClick={() => setSelectedDelete(data)}>
                          <MdDeleteOutline />
                        </button>
                      </IconContext.Provider>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditModal
        showFlag={editModal}
        setEditModal={setEditModal}
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        setTitle={setTitle}
        dispatchScheduleTitle={dispatchScheduleTitle}
      />
      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        selectedDelete={selectedDelete}
        setSelectedDelete={setSelectedDelete}
        dispatchScheduleTitle={dispatchScheduleTitle}
      />
    </div>
  );
};
