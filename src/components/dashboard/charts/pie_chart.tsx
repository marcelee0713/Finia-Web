"use client";
import { GetCategoryData } from "@/api/transaction/activity_info";
import { useGlobalContext } from "@/app/context/provider";
import { CategoryData } from "@/interfaces/transaction";
import { TransactionUseCases } from "@/types/transaction";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import { CustomTooltip } from "./custom_tooltip";

interface props {
  useCase: TransactionUseCases;
}

export const CategoryBarChart = ({ useCase }: props) => {
  const { user } = useGlobalContext();

  const {
    data: category,
    isLoading,
    error,
  } = useSWR<CategoryData>(
    user ? [{ userId: user.uid, useCase: useCase }] : null,
    ([body]) => GetCategoryData(body)
  );

  return (
    category && (
      <div className="flex-1 flex flex-col gap-2 border border-borderColor rounded-lg p-5">
        <div className="text-sm text-accent font-light">Category Breakdown</div>
        <ResponsiveContainer className="flex-1 font-light text-sm">
          <BarChart data={category.data}>
            <XAxis dataKey="categoryName" stroke="#F7DC2A" />
            <YAxis stroke="#F7DC2A" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(247, 220, 42, 0.6)" }}
            />
            <Bar dataKey="amount" fill="#F7DC2A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  );
};
