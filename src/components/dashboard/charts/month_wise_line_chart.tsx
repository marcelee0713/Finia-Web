"use client";
import { GetMonthWiseData } from "@/api/transaction/activity_info";
import { useGlobalContext } from "@/app/context/provider";
import { MonthlyData } from "@/interfaces/transaction";
import { TransactionUseCases } from "@/types/transaction";
import React, { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import { CustomTooltip } from "./custom_tooltip";
import { ChartsLoading } from "./states/loading";
import { ChartsError } from "./states/error";
import { EmptyCharts } from "./states/no-content";

interface props {
  useCase: TransactionUseCases;
  desc: string;
}

export const MonthWiseLineChart = ({ useCase, desc }: props) => {
  const { user } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR<MonthlyData | undefined>(
    user ? [{ userId: user.uid, useCase: useCase }] : null,
    ([body]) => GetMonthWiseData(body, user?.token),
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

  if (!data) return <EmptyCharts />;

  return (
    data && (
      <div className="h-[300px] xl:flex-1 xl:h-auto flex flex-col gap-2 border border-borderColor rounded-lg p-5">
        <div className="text-sm text-accent font-light">{desc}</div>
        <ResponsiveContainer className="flex-1 font-light text-sm">
          <LineChart data={data.monthlyTransactions}>
            <XAxis dataKey="month" stroke="#F7DC2A" />
            <YAxis stroke="#F7DC2A" />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(247, 220, 42, 0.6)" }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              strokeWidth={2}
              stroke="#F7DC2A"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  );
};
