import { CreateTransaction, UpdateTransaction } from "@/api/transaction/data";
import { CallbacksInterface, TransactionFormData } from "@/interfaces/form";
import { Transaction, TransactionData } from "@/interfaces/transaction";
import { TransactionFormSchema } from "@/schemas/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import Link from "next/link";
import { TransactionInput } from "./input";
import { Filter } from "../filters/filter";
import {
  EXPENSES_CATEGORIES_ARR,
  REVENUE_CATEGORIES_ARR,
  TRANSACTION_TYPES,
} from "@/constants";
import { TransactionTypes } from "@/types/transaction";

interface props {
  setModal: Dispatch<SetStateAction<boolean>>;
  data: TransactionData | undefined;
  revalidate: KeyedMutator<TransactionData>;
  mode: "CREATE" | "UPDATE";
  currentObjData?: Transaction; // This is for UPDATE mode
}

export const TransactionModal = ({
  setModal,
  revalidate,
  data,
  mode,
  currentObjData,
}: props) => {
  const [initialDate, setInitialDate] = useState<string | undefined>("");

  const [type, setType] = useState<TransactionTypes | string>("");

  const allCategories = EXPENSES_CATEGORIES_ARR.concat(REVENUE_CATEGORIES_ARR);

  const [category, setCategory] = useState<string>("");

  const [categoryArr, setCategoryArr] = useState<string[]>(allCategories);

  const [processing, setProcessing] = useState(false);

  const [checked, setChecked] = useState(false);

  const callback: CallbacksInterface = {
    onLoading() {
      setProcessing(true);
      toast.dismiss();
      toast.loading("Loading...");
    },
    onError(result) {
      setProcessing(false);
      toast.dismiss();
      toast.error(result.message);
    },
    onSuccess(result) {
      setProcessing(false);
      const obj: Transaction = JSON.parse(result);

      if (mode === "CREATE") {
        if (data) {
          const transactions: Transaction[] = data.data;

          transactions.push(obj);

          const newLength = transactions.length.toString();

          revalidate({
            filteredLength: newLength,
            length: newLength,
            data: transactions,
          });

          setModal(false);
        } else {
          const transactions: Transaction[] = [];

          transactions.push(obj);

          revalidate({
            length: "1",
            filteredLength: "1",
            data: transactions,
          });
        }

        toast.dismiss();
        toast.success("Successfully created a transaction!");
      } else {
        if (!data) return;

        const transactions: Transaction[] = data.data;

        const index = transactions.findIndex(
          (transaction) => transaction === obj
        );

        transactions[index] = obj;

        revalidate({ ...data, data: transactions });

        toast.dismiss();
        toast.success("Successfully edited a transaction!");
      }
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(TransactionFormSchema),
  });

  const preventEnterKeySubmission = (
    e: React.KeyboardEvent<HTMLFormElement>
  ) => {
    const target = e.target;
    if (e.key === "Enter" && target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  const handleTypeChange = (type?: string) => {
    if (!type) return;

    setValue("type", type);

    setType(type);

    setValue("category", "");

    setCategory("");

    if ((type as TransactionTypes) === "EXPENSES") {
      setCategoryArr(EXPENSES_CATEGORIES_ARR);
    } else {
      setCategoryArr(REVENUE_CATEGORIES_ARR);
    }
  };

  const handleCategoryChange = (category?: string) => {
    if (!category) return;

    setValue("category", category);

    setCategory(category);

    const isInExpenses = EXPENSES_CATEGORIES_ARR.includes(category);

    clearErrors("type");
    clearErrors("category");

    if (isInExpenses) {
      setType("EXPENSES" as TransactionTypes);
      setValue("type", "EXPENSES");
      return setCategoryArr(EXPENSES_CATEGORIES_ARR);
    }

    const isInRevenues = REVENUE_CATEGORIES_ARR.includes(category);

    if (isInRevenues) {
      setType("REVENUE" as TransactionTypes);
      setValue("type", "REVENUE");
      return setCategoryArr(REVENUE_CATEGORIES_ARR);
    }
  };

  const onSubmit = async (data: TransactionFormData) => {
    if (!checked) {
      toast.info("Check the checkbox to proceed!");
      return;
    }

    if (mode === "CREATE") {
      await CreateTransaction(data, callback);
    } else {
      if (!currentObjData) return;

      await UpdateTransaction({ ...data, uid: currentObjData.uid }, callback);
    }
  };

  useEffect(() => {
    if (!currentObjData) return;

    const date = new Date(currentObjData.createdAt);
    const otherDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60_000
    );
    const formattedDate = otherDate.toISOString().slice(0, 16);
    setValue("date", date);
    setInitialDate(formattedDate);

    setValue("amount", currentObjData.amount.toString());
    setValue("category", currentObjData.categoryName);
    setValue("note", currentObjData.note);
    setValue("type", currentObjData.type);
    setValue("uid", currentObjData.uid);

    handleTypeChange(currentObjData.type);
    handleCategoryChange(currentObjData.categoryName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transactionTypes = TRANSACTION_TYPES.filter((val) => val !== "ALL");

  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-opacity-80 bg-primary w-full h-full z-10 flex items-center justify-center px-2 py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={preventEnterKeySubmission}
        className="flex flex-col gap-5 h-auto max-h-full w-[400px] border border-borderColor rounded-lg bg-primary p-5 py-6 lg:p-8 overflow-y-auto no-scrollbar animate-animfadeAbove"
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 text-secondary justify-between items-center">
            <h1 className="font-bold text-3xl">
              {mode === "CREATE" ? "Add a transaction" : "Edit a transaction"}
            </h1>

            <button
              onClick={() => {
                if (!processing) {
                  setModal(false);
                }
              }}
              className="transition-transform hover:scale-125 ease-in-out"
            >
              X
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-1">
              <Filter
                alignment="bottom"
                element={type}
                onPress={(type) => handleTypeChange(type)}
                textFallback="type"
                filterArr={transactionTypes}
                width="w-full"
                height="h-[55px]"
                {...register("type")}
                additionalStyling={`${
                  !errors.type && "border border-borderColor"
                } ${errors.type && "border-2 border-borderColor"}`}
                additionalDropdownStyling="top-14"
              />
              <span
                className={`text-rose-400 duration-300 opacity-0 ease-in text-xs font-openSans ${
                  errors.type && `opacity-100`
                }`}
              >
                {errors.type && errors.type.message}
              </span>
            </div>

            <TransactionInput
              errorCatch={errors.amount}
              nameRegister="amount"
              placeholder="amount"
              register={register}
              inputType="text"
            />

            <div className="flex flex-col gap-1">
              <Filter
                alignment="bottom"
                element={category}
                onPress={(category) => handleCategoryChange(category)}
                textFallback="category"
                filterArr={categoryArr}
                width="w-full"
                height="h-[55px]"
                {...register("category")}
                additionalStyling={`${
                  !errors.category && "border border-borderColor"
                } ${errors.category && "border-2 border-borderColor"}`}
                additionalDropdownStyling="h-fit max-h-[300px] overflow-y-auto no-scrollbar top-14"
              />
              <span
                className={`text-rose-400 duration-300 opacity-0 ease-in text-xs font-openSans ${
                  errors.category && `opacity-100`
                }`}
              >
                {errors.category && errors.category.message}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                value={initialDate}
                className={`w-full bg-transparent h-[55px] outline-none border border-borderColor p-3 text-accent font-bold rounded-lg text-sm ${
                  !errors.category && "border border-borderColor"
                } ${errors.category && "border-2 border-borderColor"}`}
                type="datetime-local"
                placeholder="date"
                {...register("date", {
                  onChange(event) {
                    setInitialDate(event.target.value);
                  },
                })}
              />
              <span
                className={`text-rose-400 duration-300 opacity-0 ease-in text-xs font-openSans ${
                  errors.date && `opacity-100`
                }`}
              >
                {errors.date && errors.date.message}
              </span>
            </div>

            <TransactionInput
              errorCatch={errors.note}
              nameRegister="note"
              placeholder="note (optional)"
              register={register}
            />

            <div className="flex gap-5 items-center justify-center w-full">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="appearance-none h-5 w-5 border-2 border-secondary checked:accent-secondary checked:appearance-auto"
              />

              <div className="text-secondary text-sm font-light">
                {mode === "CREATE"
                  ? "Check to confirm for adding a new transaction"
                  : "Check to confirm for editing a transaction"}
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className={`bg-secondary text-primary h-[55px] font-bold text-sm flex justify-center items-center rounded-lg transition-transform duration-300 hover:-translate-y-2 ease-in-out ${
                processing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit
            </button>

            <hr className="border-borderColor" />

            <div className="text-xs text-accent text-center">
              By {mode === "CREATE" ? "creating" : "editing"} a transaction you
              agree to our{" "}
              <Link
                href={"/about#privacy-policy"}
                className="font-bold hover:underline"
              >
                Terms of Agreement and Privacy Policy.
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
