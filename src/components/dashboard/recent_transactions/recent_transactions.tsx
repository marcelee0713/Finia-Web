import React from "react";
import Link from "next/link";
import _ from "lodash";
import { RecentTransactionsContainer } from "./container";

export const RecentTransactions = () => {
  return (
    <div className="h-full min-w-[350px] flex flex-col gap-2 border border-borderColor rounded-lg px-4 py-3">
      <div className="flex justify-between items-center text-accent">
        <div className="font-bold">Recent Transactions</div>
        <Link href={"/transactions"} className="text-sm hover:underline">
          See more
        </Link>
      </div>
      <hr className="border border-borderColor" />
      <RecentTransactionsContainer />
    </div>
  );
};
