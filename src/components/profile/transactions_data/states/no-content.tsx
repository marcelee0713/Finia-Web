import React from "react";
import revenue from "../../../../../public/icons/base/revenue.svg";
import expenses from "../../../../../public/icons/base/expenses.svg";
import Image from "next/image";

export const EmptyTransactionProfileData = () => {
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
        <div className="text-sm font-bold text-accent">0 revenues</div>
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
        <div className="text-sm font-bold text-accent">0 expenses</div>
      </div>
    </div>
  );
};
