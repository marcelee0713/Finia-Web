import { GetActivityInfo } from "@/api/transaction/activity_info";
import { ActivityInfo } from "@/interfaces/transaction";
import { UserData } from "@/interfaces/user";
import React, { useState } from "react";
import useSWR from "swr";
import revenue from "../../../../public/icons/base/revenue.svg";
import expenses from "../../../../public/icons/base/expenses.svg";
import Image from "next/image";
import { ErrorTransactionProfileData } from "./states/error";
import { LoadingTransactionProfileData } from "./states/loading";
import { EmptyTransactionProfileData } from "./states/no-content";
import { TransactionUseCases } from "@/types/transaction";

interface props {
  user: UserData;
  useCase: TransactionUseCases;
}

export const TransactionsCount = ({ user, useCase }: props) => {
  const { data, error, isLoading } = useSWR<ActivityInfo | undefined>(
    user ? [{ userId: user.uid, useCase: useCase, skip: "0" }] : null,
    ([body]) => GetActivityInfo(body)
  );

  if (error) return <ErrorTransactionProfileData error={error} />;

  if (!user || isLoading) return <LoadingTransactionProfileData />;

  if (!data) return <EmptyTransactionProfileData />;

  const split = data.subInfo?.split(" : ") ?? "";

  const revenueData = split[0];
  const expensesData = split[1];

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
        <div className="text-sm font-bold text-accent">{revenueData}</div>
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
        <div className="text-sm font-bold text-accent">{expensesData}</div>
      </div>
    </div>
  );
};
