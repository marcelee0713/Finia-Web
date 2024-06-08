"use client";
import { GetTransactions } from "@/api/transaction/data";
import { useGlobalContext } from "@/app/context/provider";
import { TransactionData } from "@/interfaces/transaction";
import _ from "lodash";
import React, { useState } from "react";
import useSWR from "swr";
import { RecentTransactionBox } from "./recent_transaction_box";
import { LoadingRecentTransactions } from "./states/loading";
import { ErrorRecentTransactions } from "./states/error";
import { EmptyRecentTransactions } from "./states/no-content";

export const RecentTransactionsContainer = () => {
  const { user } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(true);

  const { data: transactions, error } = useSWR<TransactionData>(
    user ? [{ userId: user.uid, skip: "0", take: "10" }] : null,
    ([body]) => GetTransactions(body, user?.token),
    {
      onSuccess() {
        setIsLoading(false);
      },
      onError() {
        setIsLoading(false);
      },
    }
  );

  if (!user || isLoading) return <LoadingRecentTransactions />;

  if (error) return <ErrorRecentTransactions error={error} />;

  if ((transactions && transactions.data.length === 0) || !transactions)
    return <EmptyRecentTransactions />;

  return (
    <div className="flex-1 flex flex-col gap-2 overflow-y-auto stylish-y-scroll ">
      {_.orderBy(
        transactions.data,
        [(obj) => new Date(obj.createdAt)],
        ["desc"]
      ).map((val) => {
        return (
          <RecentTransactionBox
            key={val.uid}
            amount={val.amount.toString()}
            categoryName={val.categoryName}
            createdAt={val.createdAt}
            type={val.type}
          />
        );
      })}
    </div>
  );
};
