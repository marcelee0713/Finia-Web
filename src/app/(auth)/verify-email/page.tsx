"use client";
import { useSearchParams } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { BiSolidErrorCircle } from "react-icons/bi";
import Image from "next/image";
import React from "react";
import bg_2 from "../../../../public/backgrounds/bg_2.svg";
import loading from "../../../../public/icons/base/loading.svg";
import { ImageBackground } from "@/components/img_bg";
import Link from "next/link";
import useSWRImmutable from "swr/immutable";
import { emailVerify } from "@/api/auth";
import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";

const VerifyEmail = () => {
  const params = useSearchParams();

  const token = params.get("token");

  const { isLoading, error } = useSWRImmutable(
    token ? [`${apiUrl}/users/verify-email`, token] : null,
    ([url, token]) => emailVerify(url, token),
    {
      shouldRetryOnError: false,
    }
  );

  if (!token) {
    return (
      <main className="flex flex-col h-full w-full items-center justify-center gap-5">
        <ImageBackground image={bg_2} />

        <BiSolidErrorCircle size={250} className="text-secondary" />
        <div className="flex flex-col text-center gap-2 animate-animfadeAbove">
          <div className="font-bold text-secondary text-2xl">
            Does not exist!
          </div>
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
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex flex-col h-full w-full items-center justify-center gap-5">
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
      </main>
    );
  }

  if (error) {
    const err: ErrorResponse = error as ErrorResponse;

    return (
      <main className="flex flex-col h-full w-full items-center justify-center gap-5">
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
      </main>
    );
  }

  return (
    <main className="flex flex-col h-full w-full items-center justify-center gap-5">
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
    </main>
  );
};

export default VerifyEmail;
