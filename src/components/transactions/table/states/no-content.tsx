import React from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export const EmptyTable = () => {
  return (
    <div className="min-w-full min-h-[400px] flex flex-col items-center justify-center border border-borderColor overflow-hidden rounded-lg overflow-x-auto overflow-y-auto no-scrollbar">
      <HiMiniQuestionMarkCircle size={65} className="text-secondary" />

      <div className="flex flex-col text-center">
        <div className="font-light text-sm text-accent">No content</div>
        <div className="font-bold text-secondary text-sm">
          Create your first transaction by pressing the plus icon!
        </div>
      </div>
    </div>
  );
};
