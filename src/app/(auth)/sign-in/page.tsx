"use client";

import { InputText, InputTextPassword } from "@/components/auth/input_texts";
import bg_1 from "../../../../public/backgrounds/bg_1.svg";
import { ImageBackground } from "@/components/img_bg";
import Link from "next/link";
import React, { useState } from "react";
import { CallbacksInterface, SignInFormData } from "@/interfaces/form";
import { signInSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { emailVerificationRequest, signIn } from "@/api/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [visible, setVisible] = useState(false);

  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const emailCallback: CallbacksInterface = {
    onLoading() {
      setProcessing(true);
      toast.dismiss();
      toast.loading("Sending...");
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

  const signInCallback: CallbacksInterface = {
    onLoading() {
      setProcessing(true);
      toast.dismiss();
      toast.loading("Loading...");
    },
    onError(result) {
      setProcessing(false);
      toast.dismiss();
      if (result.type !== "unverified-email") {
        toast.error(result.message);
        return;
      }

      toast.error(result.message, {
        description: "Would you like to send another request?",
        action: {
          label: "OK",
          onClick: async () =>
            await emailVerificationRequest(
              getValues("username"),
              emailCallback
            ),
        },
      });
    },
    onSuccess() {
      setProcessing(false);
      toast.dismiss();
      router.replace("/dashboard");
    },
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <main className="flex flex-col h-full w-full p-8 overflow-y-auto items-center justify-center">
      <ImageBackground image={bg_1} />
      <form
        onSubmit={handleSubmit((data) => signIn(data, signInCallback))}
        className="flex flex-col gap-5 h-[500px] w-[400px] border border-borderColor rounded-lg bg-primary p-8 animate-animfadeAbove"
      >
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-secondary text-3xl">Sign in</h1>

          <div className="flex gap-1 font-light text-accent text-sm">
            <span>{"Don't have an account?"}</span>
            <Link href="/sign-up" className="font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-7 w-full">
          <InputText
            formType="SIGNIN"
            errorCatch={errors.username}
            nameRegister="username"
            placeholder="username"
            register={register}
          />

          <InputTextPassword
            visiblePassword={visible}
            passwordSetVisible={setVisible}
            errorCatch={errors.password}
            formType="SIGNIN"
            nameRegister="password"
            placeholder="password"
            register={register}
          />

          <button
            type="submit"
            disabled={processing}
            className={`bg-secondary h-[55px] font-bold text-sm flex justify-center items-center rounded-lg transition-transform duration-300 hover:-translate-y-2 ease-in-out ${
              processing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Sign in
          </button>

          <hr className="border-borderColor" />

          <div className="flex justify-between gap-2 text-sm text-accent">
            <Link href={"/forgot-password"}>Forgot Password?</Link>
            <Link href={"/forgot-password"}>Found an Issue?</Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
