import { TransactionTypes } from "@/types/transaction";
import { formatAmount } from "@/utils/amount_formatter";
import { formatDate } from "@/utils/date_formatter";
import React from "react";

interface props {
  categoryName: string;
  type: TransactionTypes;
  amount: string;
  createdAt: Date;
}

export const RecentTransactionBox = ({
  amount,
  categoryName,
  createdAt,
  type,
}: props) => {
  return (
    <div className="flex w-full h-[90px] items-center border border-borderColor rounded-lg gap-5 p-5">
      <div className="flex flex-col gap-1">
        <div className="font-bold text-xs text-accent">{categoryName}</div>
        <div className="font-bold  text-secondary">
          {type === "EXPENSES" ? "- " : "+ "}
          {formatAmount(amount, true)}
        </div>
        <div className="font-light italic text-xs text-accent">
          {formatDate(createdAt.toString())}
        </div>
      </div>
    </div>
  );
};
