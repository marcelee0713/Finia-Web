"use client";
import { GetMonthWiseData } from "@/api/transaction/activity_info";
import { useGlobalContext } from "@/app/context/provider";
import { MonthlyData } from "@/interfaces/transaction";
import { TransactionUseCases } from "@/types/transaction";
import React from "react";
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

interface props {
  useCase: TransactionUseCases;
}

export const MonthWiseBarChart = ({ useCase }: props) => {
  const { user } = useGlobalContext();

  const { data, isLoading, error } = useSWR<MonthlyData>(
    user ? [{ userId: user.uid, useCase: useCase }] : null,
    ([body]) => GetMonthWiseData(body)
  );

  return (
    data && (
      <div className="flex-1 flex flex-col gap-2 border border-borderColor rounded-lg p-5">
        <div className="text-sm text-accent font-light">
          Expenses for the last 12 months
        </div>
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
