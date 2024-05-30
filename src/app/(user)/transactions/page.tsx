import { TransactionTable } from "@/components/transactions";
import React from "react";

const Transactions = () => {
  return (
    <main className="flex-1 flex px-5 py-4 lg:py-10 lg:px-0 mx-auto container overflow-y-auto stylish-y-scroll">
      <TransactionTable />
    </main>
  );
};

export default Transactions;
