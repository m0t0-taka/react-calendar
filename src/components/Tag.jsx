import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdModeEditOutline,
  MdDeleteOutline,
  MdArrowBackIosNew,
} from "react-icons/md";

import { IconContext } from "react-icons";
import { useEffect } from "react";
import { EditTagModal } from "./EditTagModal";
import { ConfirmTagModal } from "./ConfirmTagModal";

const registerTag = (state, { type, payload }) => {
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

const initTags = () => {
  const storageTag = localStorage.getItem("savedTags");
  const parsedTags = storageTag ? JSON.parse(storageTag) : [];
  return parsedTags;
};

export const Tag = () => {
  const [tagName, setTagName] = useState("");
  const [validation, setValidation] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedEditTag, setSelectedEditTag] = useState("");
  const [selectedDeleteTag, setSelectedDeleteTag] = useState("");
  const [tags, dispatchTagName] = useReducer(registerTag, [], initTags);

  const duplicationCheck = tags.map((t) => t.tag).includes(tagName);

  const handleRegister = (e) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();
    if (!tagName) {
      setValidation("タグを入力してください");
    } else if (duplicationCheck) {
      setValidation("既に登録済みのタグです");
    } else {
      const scheduleTag = {
        id: Date.now(),
        tag: tagName,
      };
      dispatchTagName({ type: "push", payload: scheduleTag });
      setValidation("");
    }
    setTagName("");
  };

  // 削除ボタン押下でモーダル表示
  useEffect(() => {
    if (selectedDeleteTag) {
      setConfirmModal(true);
    }
  }, [selectedDeleteTag]);

  // 編集ボタン押下でモーダル表示
  useEffect(() => {
    if (selectedEditTag) {
      setEditModal(true);
    }
  }, [selectedEditTag]);

  useEffect(() => {
    localStorage.setItem("savedTags", JSON.stringify(tags));
  }, [tags]);

  let navigate = useNavigate();

  const handleBackCalendar = () => {
    navigate("/");
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
              登録タグ一覧
            </p>
          </div>
        </div>
        <div className="flex my-7">
          <div className="flex-1 w-48 mr-2">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="タグ"
              required
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
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
                {tags.map((data, i) => (
                  <tr className="whitespace-nowrap" key={i}>
                    <td className="w-80 px-6 py-4 text-base text-gray-900">
                      {data.tag}
                    </td>
                    <td className="px-6 py-4 text-center leading-4">
                      <IconContext.Provider
                        value={{ color: "#3b82f6", size: "16px" }}
                      >
                        <button onClick={() => setSelectedEditTag(data)}>
                          <MdModeEditOutline />
                        </button>
                      </IconContext.Provider>
                    </td>
                    <td className="px-6 py-4 text-center leading-4">
                      <IconContext.Provider
                        value={{ color: "#ec4899", size: "16px" }}
                      >
                        <button onClick={() => setSelectedDeleteTag(data)}>
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
      <EditTagModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedEditTag={selectedEditTag}
        setSelectedEditTag={setSelectedEditTag}
        dispatchTagName={dispatchTagName}
      />
      <ConfirmTagModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        selectedDeleteTag={selectedDeleteTag}
        setSelectedDeleteTag={setSelectedDeleteTag}
        dispatchTagName={dispatchTagName}
      />
    </div>
  );
};
