import React from "react";
import { InfoBox } from "../universal/info_box";
import icon from "../../../public/icons/base/transactions.svg";
import question from "../../../public/icons/base/questionmark.svg";

export const ProfileAnalyzedData = () => {
  return (
    <div className="flex-1 flex flex-col gap-5 lg:py-28 lg:h-full">
      <div className="flex-1 flex flex-col lg:flex-row gap-5">
        <InfoBox
          placeholder={{
            icon: question,
            info: "PHP 0.00",
            title: "The largest you spent",
          }}
          orientation="row"
          useCase="LARGEST_EXPENSE_INFO"
        />
        <InfoBox
          placeholder={{
            icon: question,
            info: "PHP 0.00",
            title: "The largest you earned",
          }}
          orientation="row"
          useCase="LARGEST_REVENUE_INFO"
        />
      </div>
      <div className="flex-1 flex flex-col lg:flex-row gap-5">
        <InfoBox
          orientation="row"
          useCase="TOTAL_TRANSACTION_THIS_DAY_INFO"
          title="You made over"
          icon={icon}
          placeholder={{
            icon: icon,
            info: "0 Transactions this day",
            title: "You made over",
          }}
        />
        <InfoBox
          orientation="row"
          useCase="TOTAL_TRANSACTION_THIS_MONTH_INFO"
          title="You made over"
          icon={icon}
          placeholder={{
            icon: icon,
            info: "0 Transactions this month",
            title: "You made over",
          }}
        />
      </div>
      <div className="flex-1 flex flex-col lg:flex-row gap-5">
        <InfoBox
          orientation="row"
          useCase="HIGHEST_TRANSACTION_IN_A_DAY_INFO"
          title="Highest transaction in a day"
          icon={icon}
          placeholder={{
            icon: icon,
            info: "0",
            title: "Highest transactions in a day",
          }}
        />
        <InfoBox
          orientation="row"
          useCase="TOTAL_TRANSACTIONS_INFO"
          title="Total transactions"
          icon={icon}
          placeholder={{
            icon: icon,
            info: "0 Transactions",
            title: "Total transactions",
          }}
        />
      </div>
    </div>
  );
};
