import React from "react";
import { FaFile } from "react-icons/fa";

export const EmptyRecentTransactions = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2 overflow-y-auto stylish-y-scroll">
      <FaFile size={65} className="text-secondary" />

      <div className={`flex flex-col gap-1 text-center`}>
        <div className="font-light text-sm text-accent">Empty</div>
        <div className="font-bold text-secondary text-sm">
          You don&rsquo;t have any transactions yet...
        </div>
      </div>
    </div>
  );
};
