import React, { Dispatch, SetStateAction } from "react";
import { Filter } from "./filter";
import { EXPENSES_CATEGORIES_ARR, REVENUE_CATEGORIES_ARR } from "@/constants";
import { GetActivityRequest } from "@/interfaces/transaction";
import { MdOutlineRestartAlt } from "react-icons/md";

interface props {
  userId: string;
  setTransactionModal: Dispatch<SetStateAction<boolean>>;
  transactionTypes: string[];
  currentType: string;
  onTypeChange: Dispatch<SetStateAction<string>>;
  minPriceInput: string;
  minHandleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxPriceInput: string;
  maxHandleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  currentCategory: string;
  onCategoryChange: Dispatch<SetStateAction<string>>;
  onSetCategories: Dispatch<SetStateAction<string[]>>;
  onChange: (body: GetActivityRequest) => void;
  onReset: () => void;
}

export const TransactionFilters = ({
  userId,
  categories,
  currentCategory,
  onSetCategories,
  currentType,
  maxHandleInput,
  maxPriceInput,
  minHandleInput,
  minPriceInput,
  onCategoryChange,
  onTypeChange,
  setTransactionModal,
  transactionTypes,
  onChange,
  onReset,
}: props) => {
  return (
    <div className="flex gap-1 h-[35px] min-w-full text-accent">
      <button className="flex items-center justify-center border border-borderColor w-[35px] rounded-lg transition-colors hover:bg-secondary hover:text-primary">
        +
      </button>

      <Filter
        element={currentType}
        filterArr={transactionTypes}
        onElementChange={onTypeChange}
        onPress={(type) => {
          const arr =
            type === "ALL"
              ? EXPENSES_CATEGORIES_ARR.concat(REVENUE_CATEGORIES_ARR)
              : type === "EXPENSES"
              ? EXPENSES_CATEGORIES_ARR
              : REVENUE_CATEGORIES_ARR;

          const categoryInArray = arr.find((val) => val === currentCategory);

          onSetCategories(arr);

          if (currentType !== type && !categoryInArray) {
            onCategoryChange("");

            onChange({
              userId: userId,
              category: categoryInArray ?? "",
              type: type === "ALL" ? "" : type,
            });

            return;
          }

          onChange({
            userId: userId,
            category: categoryInArray ?? "",
            type: type === "ALL" ? "" : type,
          });
        }}
      />

      <div className="flex h-full w-fit gap-[4px] text-accent font-light text-sm">
        <input
          value={minPriceInput}
          onChange={minHandleInput}
          placeholder="₱ MIN"
          type="number"
          className="bg-primary border border-borderColor rounded-lg px-3 w-[100px] outline-none"
        />
        <div className="self-center">-</div>
        <input
          value={maxPriceInput}
          onChange={maxHandleInput}
          placeholder="₱ MAX"
          type="number"
          className="bg-primary border border-borderColor rounded-lg px-3 w-[100px] outline-none"
        />
      </div>

      <Filter
        element={currentCategory}
        filterArr={categories}
        onElementChange={onCategoryChange}
        textFallback="Category"
        width="w-[200px]"
        onPress={(category) => {
          onChange({
            userId: userId,
            category: category ?? "",
          });
        }}
      />

      <div
        onClick={onReset}
        className="flex items-center justify-center border border-borderColor w-[35px] rounded-lg transition-colors hover:bg-secondary hover:text-primary cursor-pointer"
      >
        <MdOutlineRestartAlt size={20} />
      </div>
    </div>
  );
};
