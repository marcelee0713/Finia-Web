"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TransactionUseCases } from "@/types/transaction";
import useSWR from "swr";
import { GetActivityInfo } from "@/api/transaction/activity_info";
import { ActivityInfo, EmptyInfo } from "@/interfaces/transaction";
import { CategoryBasedOnIcon } from "@/utils/category_base";
import { formatAmount } from "@/utils/amount_formatter";
import { useGlobalContext } from "@/app/context/provider";
import { ErrorInfoBox } from "./info_box_states/error";
import { LoadingInfoBox } from "./info_box_states/loading";
import { EmptyInfoBox } from "./info_box_states/no-content";

interface props {
  orientation: "column" | "row";
  useCase: TransactionUseCases;
  icon?: any;
  title?: string;
  placeholder: EmptyInfo;
}

export const InfoBox = ({
  orientation,
  icon,
  useCase,
  title,
  placeholder,
}: props) => {
  const { user } = useGlobalContext();

  const containerStyle =
    orientation === "row" ? "" : "flex-col justify-center ";

  const textStyle = orientation === "row" ? "" : "text-center";

  const [isLoading, setIsLoading] = useState(true);

  const { error, data } = useSWR<ActivityInfo | undefined>(
    user ? [{ useCase: useCase }] : null,
    ([body]) => GetActivityInfo(body, user?.token),
    {
      onSuccess() {
        setIsLoading(false);
      },
      onError() {
        setIsLoading(false);
      },
    }
  );

  if (error) {
    return (
      <ErrorInfoBox
        containerStyle={containerStyle}
        error={error}
        textStyle={textStyle}
      />
    );
  }

  if (!user || isLoading) {
    return (
      <LoadingInfoBox containerStyle={containerStyle} textStyle={textStyle} />
    );
  }

  if (!data) {
    return (
      <EmptyInfoBox
        containerStyle={containerStyle}
        textStyle={textStyle}
        emptyData={placeholder}
      />
    );
  }

  return (
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
        priority
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
  );
};
