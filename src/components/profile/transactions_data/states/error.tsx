import { ErrorResponse } from "@/interfaces/error";
import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";

interface props {
  error: any;
}

export const ErrorTransactionProfileData = ({ error }: props) => {
  const err: ErrorResponse = error;

  return (
    <div className="flex gap-2 items-center">
      <BiSolidErrorCircle size={30} className="text-secondary" />
      <div className="text-sm font-bold text-accent">{err.message}</div>
    </div>
  );
};
