"use client";
import React, { useState } from "react";
import bg_2 from "../../../../public/backgrounds/bg_2.svg";
import { ImageBackground } from "@/components/img_bg";
import { CallbacksInterface, ResetPassFormData } from "@/interfaces/form";
import { ForgotPassSchema, ResetPassSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/api/auth";
import { TokenMissing } from "@/components/auth/verify-email/states";
import Link from "next/link";
import { ResetPasswordInput } from "@/components/auth/reset-password/inputs";

const ResetPassword = () => {
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
    return <TokenMissing />;
  }

  return (
    <main className="flex flex-col h-full w-full p-8 overflow-y-auto items-center justify-center">
      <ImageBackground image={bg_2} />

      <form
        onSubmit={handleSubmit((data) => resetPassword(data, token, callback))}
        className="flex flex-col gap-5 min-h-[300px] max-h-full w-[400px] border border-borderColor rounded-lg bg-primary p-8 animate-animfadeAbove"
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
    </main>
  );
};

export default ResetPassword;