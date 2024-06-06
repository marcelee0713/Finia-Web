"use client";
import { resetPasswordRequest } from "@/api/auth";
import { CallbacksInterface, ForgotPassFormData } from "@/interfaces/form";
import { ForgotPassSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ForgotPasswordInput } from "./input";

export const ForgotPasswordForm = () => {
  const [processing, setProcessing] = useState(false);

  const callback: CallbacksInterface = {
    onLoading() {
      setProcessing(true);
      toast.dismiss();
      toast.loading("Loading...");
    },
    onError(result) {
      setProcessing(false);
      toast.dismiss();
      toast.error(result.message);
    },
    onSuccess(result) {
      setProcessing(false);
      toast.dismiss();
      toast.success(result);
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassFormData>({
    resolver: zodResolver(ForgotPassSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => resetPasswordRequest(data, callback))}
      className="flex flex-col gap-5 h-auto max-h-full w-[400px] border border-borderColor rounded-lg bg-primary p-5 py-6 lg:p-8 overflow-y-auto no-scrollbar animate-animfadeAbove"
    >
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-secondary text-3xl">Forgot password?</h1>

        <div className="flex gap-1 font-light text-accent text-sm">
          <span>{"Remember it now?"}</span>
          <Link href="/sign-in" className="font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-7 w-full">
        <ForgotPasswordInput
          errorCatch={errors.email}
          nameRegister="email"
          placeholder="email"
          register={register}
        />

        <button
          type="submit"
          disabled={processing}
          className={`bg-secondary h-[55px] font-bold text-sm flex justify-center items-center rounded-lg transition-transform duration-300 hover:-translate-y-2 ease-in-out ${
            processing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit
        </button>

        <hr className="border-borderColor" />

        <div className="text-xs text-accent text-center">
          By resetting your password you agree to our{" "}
          <Link
            href={"/about#privacy-policy"}
            className="font-bold hover:underline"
          >
            Terms of Agreement and Privacy Policy.
          </Link>
        </div>
      </div>
    </form>
  );
};
