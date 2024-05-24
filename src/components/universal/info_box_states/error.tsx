import { ErrorResponse } from "@/interfaces/error";
import error from "next/error";
import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";

interface props {
  error: any;
  containerStyle: string;
  textStyle: string;
}

export const ErrorInfoBox = ({ error, containerStyle, textStyle }: props) => {
  const err: ErrorResponse = error;
  return (
    <div
      className={`flex-1 flex ${containerStyle} items-center border border-borderColor rounded-lg gap-5 p-5`}
    >
      <BiSolidErrorCircle size={65} className="text-secondary" />

      <div className={`flex flex-col  ${textStyle}`}>
        <div className="font-light text-sm text-accent">Error</div>
        <div className="font-bold text-secondary text-sm">{err.message}</div>
      </div>
    </div>
  );
};
