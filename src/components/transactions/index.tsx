"use client";
import React, { useState } from "react";

import { GetActivityRequest, Transaction } from "@/interfaces/transaction";
import { GetTransactions } from "@/api/transaction/data";
import { useGlobalContext } from "@/app/context/provider";
import useSWR from "swr";
import {
  EXPENSES_CATEGORIES_ARR,
  REVENUE_CATEGORIES_ARR,
  TRANSACTION_TYPES,
} from "@/constants";
import { TransactionFilters } from "./filters";
import { Table } from "./table";
import { formatToTwoDecimalPlaces } from "@/utils/amount_formatter";
import { toast } from "sonner";

export const TransactionTable = () => {
  const { user } = useGlobalContext();

  const [isActive, setIsActive] = useState(false);

  const [minPrice, setMinPrice] = useState<string>("");

  const [maxPrice, setMaxPrice] = useState<string>("");

  const [skip, setSkip] = useState(0);

  const [take, setTake] = useState(10);

  const [type, setType] = useState<string>("ALL");

  const [unFilteredData, setUnFilteredData] = useState<Transaction[]>([]);

  const [categoryArr, setCategoryArr] = useState<string[]>(
    type === "ALL"
      ? EXPENSES_CATEGORIES_ARR.concat(REVENUE_CATEGORIES_ARR)
      : type === "EXPENSES"
      ? EXPENSES_CATEGORIES_ARR
      : REVENUE_CATEGORIES_ARR
  );

  const [category, setCategory] = useState<string>(
    type === "ALL" ? "" : categoryArr[0]
  );

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = formatToTwoDecimalPlaces(value);
    setMinPrice(value);

    const min = parseFloat(value);
    const max = parseFloat(maxPrice);

    handleAmountChange(min, max);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = formatToTwoDecimalPlaces(value);
    setMaxPrice(value);

    const min = parseFloat(minPrice);
    const max = parseFloat(value);

    handleAmountChange(min, max);
  };

  const handleAmountChange = (min: number, max: number) => {
    if (isNaN(min) && isNaN(max)) {
      setTimeout(() => mutate(unFilteredData, false), 500);
      return;
    }

    if (!isNaN(min) && !isNaN(max)) {
      console.log("Scenario 1");

      if (min > max) {
        toast.dismiss();
        toast.error("Amount range invalid");
        return;
      }

      if (max < min) {
        toast.dismiss();
        toast.error("Amount range invalid");
        return;
      }

      toast.dismiss();

      const newData = unFilteredData.filter(
        (transaction) => transaction.amount >= min && transaction.amount <= max
      );

      setTimeout(() => mutate(newData, false), 500);
    }

    if (!isNaN(min) && isNaN(max)) {
      console.log("Scenario 2");

      const newData = unFilteredData.filter(
        (transaction) => transaction.amount >= min
      );

      setTimeout(() => mutate(newData, false), 500);
    }

    if (!isNaN(max) && isNaN(min)) {
      console.log("Scenario 3");

      const newData = unFilteredData.filter(
        (transaction) => transaction.amount <= max
      );

      console.table(newData);

      setTimeout(() => mutate(newData, false), 500);
    }
  };

  const [body, setBody] = useState<GetActivityRequest>({
    userId: user ? user.uid : "",
    type: type === "ALL" ? "" : type,
    category: category,
    skip: skip.toString(),
    take: take.toString(),
  });

  const {
    data = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Transaction[]>(
    user ? [{ ...body, userId: user.uid }] : null,
    ([body]) => GetTransactions(body),
    {
      onSuccess(data) {
        setUnFilteredData(data);
      },
      keepPreviousData: true,
    }
  );

  if (!user || !data) return <div>No Data!</div>;

  return (
    <div className="flex-1 min-w-full flex flex-col gap-2">
      <TransactionFilters
        userId={user.uid}
        setTransactionModal={setIsActive}
        transactionTypes={TRANSACTION_TYPES}
        currentType={type}
        onTypeChange={setType}
        categories={categoryArr}
        onSetCategories={setCategoryArr}
        currentCategory={category}
        onCategoryChange={setCategory}
        minPriceInput={minPrice}
        minHandleInput={handleMinInput}
        maxPriceInput={maxPrice}
        maxHandleInput={handleMaxInput}
        onChange={(newBody) => {
          setBody({ ...body, ...newBody });
        }}
        onReset={() => {
          setCategory("");
          setType("ALL");
          setMinPrice("");
          setMaxPrice("");
          setSkip(0);
          setTake(10);
          setBody({
            userId: user ? user.uid : "",
            category: "",
            type: "",
            skip: "0",
            take: "10",
          });
          mutate(unFilteredData);
        }}
      />
      <Table data={data} />
    </div>
  );
};

// TODO:
// 1. Pagination
// 2. CRUD of Transactions
// 3. Handle States
// 4. Responsiveness
