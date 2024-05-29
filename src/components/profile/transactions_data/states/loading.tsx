import React from "react";
import revenue from "../../../../../public/icons/base/revenue.svg";
import expenses from "../../../../../public/icons/base/expenses.svg";
import Image from "next/image";

export const LoadingTransactionProfileData = () => {
  return (
    <div className="flex w-full justify-evenly items-center gap-5">
      <div className="flex gap-2 items-center">
        <Image
          alt="An icon"
          src={revenue}
          quality={100}
          sizes="100vw"
          height={30}
          width={30}
        />
        <div className="text-sm font-bold bg-accent h-5 w-14 rounded-lg animate-pulse"></div>
      </div>
      <div className="flex gap-2 items-center">
        <Image
          alt="An icon"
          src={expenses}
          quality={100}
          sizes="100vw"
          height={30}
          width={30}
        />
        <div className="text-sm font-bold bg-accent h-5 w-14 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};
