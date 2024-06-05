"use client";
import { resetPassword } from "@/api/auth";
import { CallbacksInterface, ResetPassFormData } from "@/interfaces/form";
import { ResetPassSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ResetPasswordInput } from "./inputs";
import { TokenMissing } from "../verify-email/states";

export const ResetPasswordForm = () => {
  const [visible, setVisible] = useState(false);

  const [cfrmVisible, setCfrmVisible] = useState(false);

  const [processing, setProcessing] = useState(false);

  const params = useSearchParams();

  const token = params.get("token");

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
  } = useForm<ResetPassFormData>({
    resolver: zodResolver(ResetPassSchema),
  });

  if (!token) {
    return (
      <main className="flex flex-col h-full w-full items-center justify-center gap-5">
        <TokenMissing />
      </main>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => resetPassword(data, token, callback))}
      className="flex flex-col gap-5 h-[570px] tall:min-h-[570px] max-h-full w-[400px] border border-borderColor rounded-lg bg-primary p-5 py-6 lg:p-8 overflow-y-auto no-scrollbar animate-animfadeAbove"
    >
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-secondary text-3xl">Reset Password</h1>

        <div className="flex gap-1 font-light text-accent text-sm">
          <span>{"Remember it now?"}</span>
          <Link href="/sign-in" className="font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-7 w-full">
        <ResetPasswordInput
          errorCatch={errors.password}
          nameRegister="password"
          visiblePassword={visible}
          passwordSetVisible={setVisible}
          placeholder="new password"
          register={register}
        />

        <ResetPasswordInput
          errorCatch={errors.cfrmPassword}
          nameRegister="cfrmPassword"
          visiblePassword={cfrmVisible}
          passwordSetVisible={setCfrmVisible}
          placeholder="re-enter new password"
          register={register}
        />

        <div className="text-xs text-secondary text-center">
          {
            "Password should be at least 8 character(s), 1 special character, 1 number, and 1 capital letter"
          }
        </div>

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
