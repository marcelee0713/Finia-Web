import React from "react";
import loading from "../../../../../public/icons/base/loading.svg";
import Image from "next/image";

export const ChartsLoading = () => {
  return (
    <div className="flex-1 flex flex-col gap-1 border border-borderColor items-center justify-center rounded-lg p-5">
      <Image
        alt="A loading icon"
        src={loading}
        quality={100}
        sizes="100vw"
        height={65}
        width={65}
        className="animate-spin"
      />
      <div className="text-accent font-light">Fetching...</div>
    </div>
  );
};
