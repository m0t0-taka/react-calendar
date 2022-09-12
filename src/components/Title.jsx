import React from "react";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";

import { IconContext } from "react-icons";

const handleRegister = () => {};

export const Title = () => {
  return (
    <div className="flex justify-center mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-end my-4">
          <button
            type="submit"
            onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
          >
            追加登録
          </button>
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
                <tr className="whitespace-nowrap">
                  <td className="w-80 px-6 py-4 text-base text-gray-900">
                    羽島店ああああ
                  </td>
                  <td className="px-6 py-4 text-center leading-4">
                    <IconContext.Provider
                      value={{ color: "#2563eb", size: "16px" }}
                    >
                      <button>
                        <MdModeEditOutline />
                      </button>
                    </IconContext.Provider>
                  </td>
                  <td className="px-6 py-4 text-center leading-4">
                    <IconContext.Provider
                      value={{ color: "#dc2626", size: "16px" }}
                    >
                      <button>
                        <MdDeleteOutline />
                      </button>
                    </IconContext.Provider>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
