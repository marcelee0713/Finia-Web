import { EmptyInfo } from "@/interfaces/transaction";
import React from "react";
import Image from "next/image";

interface props {
  containerStyle: string;
  textStyle: string;
  emptyData: EmptyInfo;
}

export const EmptyInfoBox = ({
  containerStyle,
  textStyle,
  emptyData,
}: props) => {
  return (
    <div
      className={`flex-1 flex ${containerStyle} items-center border border-borderColor rounded-lg gap-5 p-5`}
    >
      <Image
        alt="An icon"
        src={emptyData.icon}
        quality={100}
        sizes="100vw"
        height={65}
        width={65}
        priority
      />

      <div className={`flex flex-col gap-1 ${textStyle}`}>
        <div className="font-light text-sm text-accent">{emptyData.title}</div>
        <div className="font-bold text-secondary">{emptyData.info}</div>
        {emptyData.subInfo && (
          <div className="font-light italic text-xs text-accent">
            {emptyData.subInfo}
          </div>
        )}
      </div>
    </div>
  );
};
