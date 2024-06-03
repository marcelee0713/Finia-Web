"use client";
import React from "react";
import loading from "../../../../public/icons/base/loading.svg";
import bg_2 from "../../../../public/backgrounds/bg_2.svg";
import Image from "next/image";
import { ImageBackground } from "@/components/img_bg";
import Link from "next/link";
import { BiSolidErrorCircle } from "react-icons/bi";
import { ErrorResponse } from "@/interfaces/error";
import { FaCircleCheck } from "react-icons/fa6";

export const Verifying = () => {
  return (
    <>
      <Image
        alt="Loading..."
        src={loading}
        quality={100}
        sizes="100vw"
        height={250}
        width={250}
        className="animate-spin"
      />
      <div className="flex flex-col text-center gap-2 animate-animfadeAbove">
        <div className="font-bold text-secondary text-2xl">Verifying...</div>
        <div className="font-light text-accent text-sm">
          Please wait while we verify your request.
        </div>
      </div>
    </>
  );
};

export const TokenMissing = () => {
  return (
    <>
      <ImageBackground image={bg_2} />

      <BiSolidErrorCircle size={250} className="text-secondary" />
      <div className="flex flex-col text-center gap-2 animate-animfadeAbove">
        <div className="font-bold text-secondary text-2xl">Does not exist!</div>
        <div className="font-light text-accent text-sm">
          This request does not exist, please try another request!
        </div>
      </div>

      <Link
        className="font-bold animate-animfadeBelow text-secondary"
        href={"/sign-in"}
      >
        Sign in
      </Link>
    </>
  );
};

export const ErrorVerification = (err: ErrorResponse) => {
  return (
    <>
      <ImageBackground image={bg_2} />

      <BiSolidErrorCircle size={250} className="text-secondary" />
      <div className="flex flex-col text-center gap-2 animate-animfadeAbove">
        <div className="font-bold text-secondary text-2xl">Error</div>
        <div className="font-light text-accent text-sm">{err.message}</div>
      </div>

      <Link
        className="font-bold animate-animfadeBelow text-secondary"
        href={"/sign-in"}
      >
        Sign in
      </Link>
    </>
  );
};

export const SuccessfulEmailVerification = () => {
  return (
    <>
      <ImageBackground image={bg_2} />

      <FaCircleCheck size={250} className="text-secondary" />
      <div className="flex flex-col text-center gap-2 animate-animfadeAbove">
        <div className="font-bold text-secondary text-2xl">Success!</div>
        <div className="font-light text-accent text-sm">
          You have verified your email address and can now sign in!
        </div>
      </div>

      <Link
        className="font-bold animate-animfadeBelow text-secondary"
        href={"/sign-in"}
      >
        Sign in
      </Link>
    </>
  );
};
