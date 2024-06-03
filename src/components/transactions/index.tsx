"use client";
import React, { useState } from "react";
import { GetActivityRequest, TransactionData } from "@/interfaces/transaction";
import { GetTransactions } from "@/api/transaction/data";

import {
  EXPENSES_CATEGORIES_ARR,
  REVENUE_CATEGORIES_ARR,
  TRANSACTION_TYPES,
} from "@/constants";
import { TransactionFilters } from "./filters";
import { Table } from "./table";
import { formatToTwoDecimalPlaces } from "@/utils/amount_formatter";
import { toast } from "sonner";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useDebouncedCallback } from "use-debounce";
import { TransactionModal } from "./modal";
import useSWRImmutable from "swr/immutable";

export const TransactionTable = () => {
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

  const resetPagination = () => {
    setSkip(0);

    setTake(10);

    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
  };

  const handleAmountChange = useDebouncedCallback(
    (min: number, max: number) => {
      if (isNaN(min) && isNaN(max)) {
        resetPagination();

        setBody({
          ...body,
          minAmount: min.toString(),
          maxAmount: max.toString(),
        });
        return;
      }

      if (!isNaN(min) && !isNaN(max)) {
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

        resetPagination();

        setBody({
          ...body,
          minAmount: min.toString(),
          maxAmount: max.toString(),
        });
      }

      if (!isNaN(min) && isNaN(max)) {
        resetPagination();

        setBody({
          ...body,
          minAmount: min.toString(),
        });
      }

      if (!isNaN(max) && isNaN(min)) {
        resetPagination();

        setBody({
          ...body,
          maxAmount: max.toString(),
        });
      }
    },
    500
  );

  const [body, setBody] = useState<GetActivityRequest>({
    type: type === "ALL" ? "" : type,
    category: category,
    skip: skip.toString(),
    take: take.toString(),
    dateOrder: "desc",
  });

  const {
    data: transactions,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWRImmutable<TransactionData>(body, (body) => GetTransactions(body), {
    keepPreviousData: true,
    revalidateIfStale: true,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: skip,
    pageSize: take,
  });

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: true,
      id: "createdAt",
    },
  ]);

  return (
    <div className="flex-1 min-w-[750px] flex flex-col gap-2">
      <TransactionFilters
        data={transactions ? transactions.data : []}
        isValidating={isValidating}
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

          resetPagination();

          setSorting([]);

          setBody({
            category: "",
            type: "",
            skip: "0",
            take: "10",
            minAmount: "",
            maxAmount: "",
          });
        }}
      />

      <Table
        data={transactions}
        isLoading={isLoading}
        error={error}
        sorting={sorting}
        pagination={pagination}
        setSorting={setSorting}
        setPagination={setPagination}
        onSort={(amountOrder, dateOrder, noteOrder) => {
          setBody({ ...body, dateOrder, amountOrder, noteOrder });
        }}
        onPaginate={(skipVal, takeVal) => {
          setSkip(skipVal);

          setTake(takeVal);

          setBody({
            ...body,
            skip: skipVal.toString(),
            take: takeVal.toString(),
          });
        }}
        revalidate={mutate}
      />

      {isActive && (
        <TransactionModal
          setModal={setIsActive}
          data={transactions}
          revalidate={mutate}
          mode="CREATE"
        />
      )}
    </div>
  );
};

// TODO:
// 1. CRUD of Transactions
