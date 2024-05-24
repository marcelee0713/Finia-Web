import React from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

interface props {
  containerStyle: string;
  textStyle: string;
}

export const EmptyInfoBox = ({ containerStyle, textStyle }: props) => {
  return (
    <div
      className={`flex-1 flex ${containerStyle} items-center border border-borderColor rounded-lg gap-5 p-5`}
    >
      <HiMiniQuestionMarkCircle size={65} className="text-secondary" />

      <div className={`flex flex-col  ${textStyle}`}>
        <div className="font-light text-sm text-accent">No content</div>
        <div className="font-bold text-secondary text-sm">
          Not enough data to view this section!
        </div>
      </div>
    </div>
  );
};
