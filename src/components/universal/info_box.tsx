import React from "react";
import Image from "next/image";

interface props {
  title: string;
  info: string;
  subInfo?: string;
  icon: any;
  orientation: "column" | "row";
}

export const InfoBox = ({ title, info, subInfo, orientation, icon }: props) => {
  const containerStyle = orientation === "row" ? "" : "flex-col justify-center";
  const textStyle = orientation === "row" ? "" : "text-center";

  return (
    <div
      className={`flex-1 flex ${containerStyle} items-center border border-borderColor rounded-lg gap-5 p-5`}
    >
      <Image
        alt="An icon"
        src={icon}
        quality={100}
        sizes="100vw"
        height={65}
        width={65}
      />

      <div className={`flex flex-col gap-2 ${textStyle}`}>
        <div className="font-light text-sm text-accent">{title}</div>
        <div className="font-bold text-secondary">{info}</div>
        {subInfo && (
          <div className="font-light italic text-xs text-accent">{subInfo}</div>
        )}
      </div>
    </div>
  );
};
