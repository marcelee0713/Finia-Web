"use client";
import React, { useState } from "react";

import { GetActivityRequest, Transaction } from "@/interfaces/transaction";
import { GetTransactions } from "@/api/transaction/data";
import { useGlobalContext } from "@/app/context/provider";
import useSWRImmutable from "swr/immutable";
import {
  EXPENSES_CATEGORIES_ARR,
  REVENUE_CATEGORIES_ARR,
  TRANSACTION_TYPES,
} from "@/constants";
import { TransactionFilters } from "./filters";
import { Table } from "./table";

export const TransactionTable = () => {
  const { user } = useGlobalContext();

  const [isActive, setIsActive] = useState(false);

  const [minPrice, setMinPrice] = useState<string>("");

  const [maxPrice, setMaxPrice] = useState<string>("");

  const [skip, setSkip] = useState(0);

  const [take, setTake] = useState(10);

  const [type, setType] = useState<string>("ALL");

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
    setMinPrice(e.currentTarget.value);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.currentTarget.value);
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
  } = useSWRImmutable<Transaction[]>(
    user ? [{ ...body, userId: user.uid }] : null,
    ([body]) => GetTransactions(body)
  );

  if (!user || !data) return <div>No Data!</div>;

  return (
    <div className="flex-1 flex flex-col gap-2">
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
          setMinPrice("");
          setSkip(0);
          setTake(10);
          setBody({
            userId: user ? user.uid : "",
            category: "",
            type: "",
            skip: "0",
            take: "10",
          });
        }}
      />
      <Table data={data} />
    </div>
  );
};

// TODO:
// 1. Finish the other filters
// 2. Change the data type of amount from string to number
// 3. Pagination
// 4. CRUD of Transactions
