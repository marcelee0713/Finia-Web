import { ErrorResponse } from "@/interfaces/error";
import React from "react";
import { MdOutlineError } from "react-icons/md";

interface props {
  error: any;
}

export const ErrorTable = ({ error }: props) => {
  const err: ErrorResponse = error;
  return (
    <div className="min-w-full min-h-[400px] flex flex-col items-center justify-center border border-borderColor overflow-hidden rounded-lg overflow-x-auto overflow-y-auto no-scrollbar">
      <MdOutlineError size={65} className="text-secondary" />
      <div className="flex flex-col text-center">
        <div className="font-light text-sm text-accent">Error</div>
        <div className="font-bold text-secondary text-sm">{err.message}</div>
      </div>
    </div>
  );
};
