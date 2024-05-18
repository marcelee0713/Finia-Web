"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWRImmutable from "swr/immutable";
import { emailVerify } from "@/api/auth";
import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import {
  ErrorVerification,
  SuccessfulEmailVerification,
  TokenMissing,
  Verifying,
} from "@/components/auth/verify-email/states";

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
    return <TokenMissing />;
  }

  if (isLoading) {
    return <Verifying />;
  }

  if (error) {
    const err: ErrorResponse = error as ErrorResponse;
    return (
      <ErrorVerification
        message={err.message}
        status={err.status}
        type={err.type}
      />
    );
  }

  return <SuccessfulEmailVerification />;
};

export default VerifyEmail;
