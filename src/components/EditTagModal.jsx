import React, { useState } from "react";
import { useEffect } from "react";

export const EditTagModal = (props) => {
  const {
    editModal,
    setEditModal,
    selectedEditTag,
    setSelectedEditTag,
    dispatchTagName,
  } = props;
  const [editTag, setEditTag] = useState("");

  useEffect(() => {
    if (selectedEditTag) {
      setEditTag(selectedEditTag.tag);
    }
  }, [selectedEditTag]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateTag = {
      id: selectedEditTag.id,
      tag: editTag,
    };
    dispatchTagName({ type: "update", payload: updateTag });
    setEditModal(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditModal(false);
    setSelectedEditTag("");
  };

  return (
    <>
      {editModal ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-auto sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title"
                      >
                        タイトル編集
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5"
                          placeholder="タイトル"
                          required
                          value={editTag}
                          onChange={(e) => setEditTag(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-200 hover:bg-orange-300 px-4 py-2 text-base text-yellow-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleUpdate}
                  >
                    更新
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
