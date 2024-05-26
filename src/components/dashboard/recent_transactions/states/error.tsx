import { ErrorResponse } from "@/interfaces/error";
import { BiSolidErrorCircle } from "react-icons/bi";
import React from "react";

interface props {
  error: any;
}

export const ErrorRecentTransactions = ({ error }: props) => {
  const err: ErrorResponse = error;

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2 overflow-y-auto stylish-y-scroll">
      <BiSolidErrorCircle size={65} className="text-secondary" />
      <div className={`flex flex-col gap-1 text-center`}>
        <div className="font-light text-sm text-accent">Error</div>
        <div className="font-bold text-secondary text-sm">{err.message}</div>
      </div>
    </div>
  );
};
