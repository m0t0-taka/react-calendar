import React from "react";

const week = ["日", "月", "火", "水", "木", "金", "土"];

const sundayColor = (c) => {
  switch (c) {
    case 0:
      return "text-red-600";
    case 6:
      return "text-blue-600";
    default:
      return "";
  }
};

export const Week = () => {
  return (
    <>
      {week.map((w, i) => (
        <div className="border border-gray-200 flex flex-col">
          <div className={`flex flex-col items-center ${sundayColor(i)}`}>
            {w}
          </div>
        </div>
      ))}
    </>
  );
};
