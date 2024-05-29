import React from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export const EmptyCharts = () => {
  return (
    <div className="flex-1 flex flex-col gap-1 border border-borderColor items-center justify-center rounded-lg p-5">
      <HiMiniQuestionMarkCircle size={65} className="text-secondary" />

      <div className={`flex flex-col gap-1 text-center`}>
        <div className="font-light text-sm text-accent">No content</div>
        <div className="font-bold text-secondary text-sm">
          Not enough data to show this section!
        </div>
      </div>
    </div>
  );
};
