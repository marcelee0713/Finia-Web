"use client";
import { GetCategoryData } from "@/api/transaction/activity_info";
import { useGlobalContext } from "@/app/context/provider";
import { CategoryData } from "@/interfaces/transaction";
import { TransactionUseCases } from "@/types/transaction";
import React, { useState } from "react";
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
import { ChartsError } from "./states/error";
import { ChartsLoading } from "./states/loading";
import { EmptyCharts } from "./states/no-content";

interface props {
  useCase: TransactionUseCases;
  desc: string;
}

export const CategoryBarChart = ({ useCase, desc }: props) => {
  const { user } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(true);

  const { data: category, error } = useSWR<CategoryData | undefined>(
    user ? [{ userId: user.uid, useCase: useCase }] : null,
    ([body]) => GetCategoryData(body, user?.token),
    {
      onSuccess() {
        setIsLoading(false);
      },
      onError() {
        setIsLoading(false);
      },
    }
  );

  if (!user || isLoading) return <ChartsLoading />;

  if (error) return <ChartsError error={error} />;

  if (!category) return <EmptyCharts />;

  return (
    category && (
      <div className="h-[300px] xl:flex-1 xl:h-auto flex flex-col gap-2 border border-borderColor rounded-lg p-5">
        <div className="text-sm text-accent font-light">{desc}</div>
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
