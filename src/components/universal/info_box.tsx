"use client";
import React from "react";
import Image from "next/image";
import { TransactionUseCases } from "@/types/transaction";
import useSWR from "swr";
import { GetActivityInfo } from "@/api/transaction/activity_info";
import { ActivityInfo } from "@/interfaces/transaction";
import { CategoryBasedOnIcon } from "@/utils/category_base";
import { formatAmount } from "@/utils/amount_formatter";
import { useGlobalContext } from "@/app/context/provider";

interface props {
  orientation: "column" | "row";
  useCase: TransactionUseCases;
  icon?: any;
  title?: string;
}

export const InfoBox = ({ orientation, icon, useCase, title }: props) => {
  const { user } = useGlobalContext();

  const containerStyle = orientation === "row" ? "" : "flex-col justify-center";

  const textStyle = orientation === "row" ? "" : "text-center";

  const { isLoading, error, data } = useSWR<ActivityInfo>(
    user ? [{ userId: user.uid, useCase: useCase }] : null,
    ([body]) => GetActivityInfo(body)
  );

  return (
    data && (
      <div
        className={`flex-1 flex ${containerStyle} items-center border border-borderColor rounded-lg gap-5 p-5`}
      >
        <Image
          alt="An icon"
          src={icon ? icon : CategoryBasedOnIcon(data.category ?? "")}
          quality={100}
          sizes="100vw"
          height={65}
          width={65}
        />

        <div className={`flex flex-col gap-1 ${textStyle}`}>
          <div className="font-light text-sm text-accent">
            {title ? title : data.info}
          </div>
          <div className="font-bold text-secondary">
            {data.amount ? formatAmount(data.amount, true) : data.info}
          </div>
          {data.subInfo && (
            <div className="font-light italic text-xs text-accent">
              {data.subInfo}
            </div>
          )}
        </div>
      </div>
    )
  );
};
