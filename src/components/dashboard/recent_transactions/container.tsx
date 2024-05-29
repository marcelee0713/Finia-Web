"use client";
import { GetTransactions } from "@/api/transaction/data";
import { useGlobalContext } from "@/app/context/provider";
import { Transaction } from "@/interfaces/transaction";
import _ from "lodash";
import React, { useState } from "react";
import useSWR from "swr";
import { RecentTransactionBox } from "./recent_transaction_box";
import { LoadingRecentTransactions } from "./states/loading";
import { ErrorRecentTransactions } from "./states/error";
import { EmptyRecentTransactions } from "./states/no-content";

export const RecentTransactionsContainer = () => {
  const { user } = useGlobalContext();

  const { data, error, isLoading } = useSWR<Transaction[] | undefined>(
    user ? [{ userId: user.uid, skip: "0", take: "10" }] : null,
    ([body]) => GetTransactions(body)
  );

  if (!user || isLoading) return <LoadingRecentTransactions />;

  if (error) return <ErrorRecentTransactions error={error} />;

  if ((data && data.length === 0) || !data) return <EmptyRecentTransactions />;

  return (
    <div className="flex-1 flex flex-col gap-2 overflow-y-auto stylish-y-scroll ">
      {_.orderBy(data, [(obj) => new Date(obj.createdAt)], ["desc"]).map(
        (val) => {
          return (
            <RecentTransactionBox
              key={val.uid}
              amount={val.amount}
              categoryName={val.categoryName}
              createdAt={val.createdAt}
              type={val.type}
            />
          );
        }
      )}
    </div>
  );
};
