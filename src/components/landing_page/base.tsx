import Link from "next/link";
import React from "react";

export const Base = () => {
  return (
    <div className="animate-animfadeAbove flex-1 flex flex-col items-center justify-center text-secondary text-center text-base gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-8xl">Finia</h1>
        <p className="font-light text-accent">
          The simplest way to track your expenses and revenue
        </p>
      </div>

      <Link className="font-bold" href={"/sign-in"}>
        Sign in
      </Link>
    </div>
  );
};
