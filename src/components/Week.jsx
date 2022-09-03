import React from "react";

const week = ["日", "月", "火", "水", "木", "金", "土"];

export const Week = () => {
  return (
    <>
      {week.map((w) => (
        <div className="border border-gray-200 flex flex-col">
          <div className="flex flex-col items-center">{w}</div>
        </div>
      ))}
    </>
  );
};
