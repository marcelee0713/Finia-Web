"use client";
import React, { useState } from "react";
import { InfoBox } from "../universal/info_box";
import allTime from "../../../public/icons/base/clock.svg";
import calendar from "../../../public/icons/base/calendar.svg";
import netIncome from "../../../public/icons/base/net-income.svg";
import { MonthWiseLineChart } from "./charts/month_wise_line_chart";
import { CategoryBarChart } from "./charts/category_bar_chart";
import { TransactionTypes } from "@/types/transaction";
import questionMark from "../../../public/icons/base/questionmark.svg";

export const AnalyzedContainer = () => {
  const [mode, setMode] = useState<TransactionTypes>("EXPENSES");

  return (
    <div className="flex-[3_3_0%] flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <div className="font-light text-accent">Current Mode:</div>
        <button
          onClick={() => {
            if (mode === "EXPENSES") {
              setMode("REVENUE");
            } else {
              setMode("EXPENSES");
            }
          }}
          className="bg-secondary text-primary font-bold px-4 py-2 rounded-lg transition-transform hover:-translate-y-1"
        >
          {mode}
        </button>
      </div>

      <div className="flex-1 flex gap-5 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col gap-5">
          <InfoBox
            orientation="row"
            useCase={
              mode === "EXPENSES"
                ? "TOTAL_EXPENSES_INFO"
                : "TOTAL_REVENUES_INFO"
            }
            placeholder={{
              icon: allTime,
              info: "PHP 0.00",
              title:
                mode === "EXPENSES"
                  ? "Total expenses all time"
                  : "Total revenue all time",
            }}
            icon={allTime}
          />
          <InfoBox
            orientation="row"
            useCase={
              mode === "EXPENSES"
                ? "CURRENT_MONTH_EXPENSES_INFO"
                : "CURRENT_MONTH_REVENUE_INFO"
            }
            icon={calendar}
            placeholder={{
              icon: calendar,
              info: "PHP 0.00",
              title:
                mode === "EXPENSES"
                  ? "Current expenses this month"
                  : "Current revenue this month",
            }}
          />
        </div>
        <InfoBox
          orientation="column"
          useCase="NET_INCOME_INFO"
          icon={netIncome}
          placeholder={{
            icon: netIncome,
            info: "PHP 0.00",
            title: "Net income",
          }}
        />
        <div className="flex-1 flex flex-col gap-5">
          <InfoBox
            orientation="row"
            placeholder={{
              icon: questionMark,
              info: "PHP 0.00",
              title: "Most spent category",
            }}
            useCase="MOST_SPENT_CATEGORY_INFO"
          />
          <InfoBox
            orientation="row"
            placeholder={{
              icon: questionMark,
              info: "PHP 0.00",
              title: "Most earned category",
            }}
            useCase="MOST_EARNED_INFO"
          />
        </div>
      </div>
      <div className="flex-grow-[2] flex gap-5 flex-col xl:flex-row">
        <MonthWiseLineChart
          desc={
            mode === "EXPENSES"
              ? "Expenses for the last 12 months"
              : "Revenue for the last 12 months"
          }
          useCase={
            mode === "EXPENSES"
              ? "MONTHLY_EXPENSES_GRAPH"
              : "MONTHLY_REVENUE_GRAPH"
          }
        />
        <CategoryBarChart
          desc={
            mode === "EXPENSES"
              ? "Expenses Category Breakdown"
              : "Revenue Category Breakdown"
          }
          useCase={
            mode === "EXPENSES"
              ? "EXPENSES_BY_CATEGORY_GRAPH"
              : "REVENUE_BY_CATEGORY_GRAPH"
          }
        />
      </div>
    </div>
  );
};
