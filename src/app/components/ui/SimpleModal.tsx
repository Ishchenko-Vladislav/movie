import React from "react";

export const SimpleModal = () => {
  return (
    <div
      className="px-3 py-2 absolute z-50 text-black text-lg bg-white rounded-xl select-none
    "
    >
      <div className="cursor-pointer hover:opacity-50">Popular</div>
      <div className="cursor-pointer hover:opacity-50">Top Reted</div>
    </div>
  );
};
