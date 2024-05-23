import React from "react";
import { InfoBox } from "../universal/info_box";
import allTime from "../../../public/icons/base/clock.svg";
import calendar from "../../../public/icons/base/calendar.svg";
import netIncome from "../../../public/icons/base/net-income.svg";
import { MonthWiseBarChart } from "./charts/bar_chart";
import { CategoryBarChart } from "./charts/pie_chart";

export const AnalyzedContainer = () => {
  return (
    <div className="flex-[3_3_0%] flex flex-col gap-5">
      <div className="flex-1 flex gap-5 ">
        <div className="flex-1 flex flex-col gap-5">
          <InfoBox
            orientation="row"
            useCase="TOTAL_EXPENSES_INFO"
            icon={allTime}
          />
          <InfoBox
            orientation="row"
            useCase="CURRENT_MONTH_EXPENSES_INFO"
            icon={calendar}
          />
        </div>
        <InfoBox
          orientation="column"
          useCase="NET_INCOME_INFO"
          icon={netIncome}
        />
        <div className="flex-1 flex flex-col gap-5">
          <InfoBox orientation="row" useCase="MOST_SPENT_CATEGORY_INFO" />
          <InfoBox orientation="row" useCase="MOST_EARNED_INFO" />
        </div>
      </div>
      <div className="flex-grow-[2] flex gap-5">
        <MonthWiseBarChart useCase="MONTHLY_EXPENSES_GRAPH" />
        <CategoryBarChart useCase="EXPENSES_BY_CATEGORY_GRAPH" />
      </div>
    </div>
  );
};
