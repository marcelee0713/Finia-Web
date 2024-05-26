import React from "react";
import loading from "../../../../../public/icons/base/loading.svg";
import Image from "next/image";
import { ErrorResponse } from "@/interfaces/error";

interface props {
  error: any;
}

export const ChartsError = ({ error }: props) => {
  const err: ErrorResponse = error;

  return (
    <div className="flex-1 flex flex-col gap-1 border border-borderColor items-center justify-center rounded-lg">
      <Image
        alt="A loading icon"
        src={loading}
        quality={100}
        sizes="100vw"
        height={65}
        width={65}
        className="animate-spin"
      />
      <div className={`flex flex-col gap-1 text-center`}>
        <div className="font-light text-sm text-accent">Error</div>
        <div className="font-bold text-secondary text-sm">{err.message}</div>
      </div>
    </div>
  );
};
