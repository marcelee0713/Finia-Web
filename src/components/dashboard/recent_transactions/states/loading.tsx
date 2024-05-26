import React from "react";

export const LoadingRecentTransactions = () => {
  return (
    <div className="flex-1 flex flex-col gap-2 overflow-y-auto stylish-y-scroll">
      <RecentTransactionBoxLoading />
      <RecentTransactionBoxLoading />
      <RecentTransactionBoxLoading />
      <RecentTransactionBoxLoading />
      <RecentTransactionBoxLoading />
    </div>
  );
};

const RecentTransactionBoxLoading = () => {
  return (
    <div className="flex w-full h-[90px] items-center border border-borderColor rounded-lg gap-5 p-5 animate-pulse">
      <div className="flex flex-col gap-1 w-full">
        <div className="w-10 h-2 bg-accent rounded-lg"></div>
        <div className="w-[80%] h-2 bg-secondary rounded-lg"></div>
        <div className="w-[60%] h-1 bg-accent rounded-lg"></div>
      </div>
    </div>
  );
};
