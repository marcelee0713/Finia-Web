"use client";
import { GetTransactions } from "@/api/transaction/data";
import { useGlobalContext } from "@/app/context/provider";
import { Transaction } from "@/interfaces/transaction";
import React from "react";
import useSWR from "swr";
import { formatAmount } from "@/utils/amount_formatter";
import { formatDate } from "@/utils/date_formatter";
import Link from "next/link";
import _ from "lodash";

export const RecentTransactions = () => {
  const { user } = useGlobalContext();

  const { data, isLoading, error } = useSWR<Transaction[]>(
    user ? [{ userId: user.uid, skip: "0", take: "10" }] : null,
    ([body]) => GetTransactions(body)
  );

  return (
    data && (
      <div className="h-full min-w-[350px] flex flex-col gap-2 border border-borderColor rounded-lg px-4 py-3">
        <div className="flex justify-between items-center text-accent">
          <div className="font-bold">Recent Transactions</div>
          <Link href={"/transactions"} className="text-sm hover:underline">
            See more
          </Link>
        </div>
        <hr className="border border-borderColor" />
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto stylish-y-scroll ">
          {_.orderBy(data, [(obj) => new Date(obj.createdAt)], ["desc"]).map(
            (val) => {
              return (
                <div
                  key={val.uid}
                  className="flex-1 flex w-full h-[90px] items-center border border-borderColor rounded-lg gap-5 p-5"
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-xs text-accent">
                      {val.categoryName}
                    </div>
                    <div className="font-bold  text-secondary">
                      {val.type === "EXPENSES" ? "- " : "+ "}
                      {formatAmount(val.amount, true)}
                    </div>
                    <div className="font-light italic text-xs text-accent">
                      {formatDate(val.createdAt.toString())}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    )
  );
};
