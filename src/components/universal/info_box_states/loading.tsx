import fallback from "../../../../public/icons/base/fallback-icon.svg";
import React from "react";
import Image from "next/image";

interface props {
  containerStyle: string;
  textStyle: string;
}

export const LoadingInfoBox = ({ containerStyle, textStyle }: props) => {
  return (
    <div
      className={`flex-1 flex ${containerStyle} items-center border border-borderColor rounded-lg gap-5 p-5 animate-pulse`}
    >
      <Image
        alt="An icon"
        src={fallback}
        quality={100}
        sizes="100vw"
        height={65}
        width={65}
        priority
      />

      <div
        className={`flex flex-col ${
          textStyle ? "justify-center items-center" : ""
        } gap-2 w-full`}
      >
        <div className="font-light text-sm text-accent h-2 w-14 bg-accent rounded-lg"></div>
        <div className="font-bold text-secondary h-4 w-[80%] bg-secondary rounded-lg"></div>
      </div>
    </div>
  );
};
