"use client";

import { InputText, InputTextPassword } from "@/components/auth/input_texts";
import bg_1 from "../../../../public/backgrounds/bg_1.svg";
import { ImageBackground } from "@/components/img_bg";
import Link from "next/link";
import React, { useState } from "react";
import { CallbacksInterface, SignUpFormData } from "@/interfaces/form";
import { signUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [visible, setVisible] = useState(false);

  const [cfrmVisible, setCfrmVisible] = useState(false);

  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const states: CallbacksInterface = {
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

      const split = result.split(":");
      const username = split[0];
      const email = split[1];

      router.replace(`/greet?username=${username}&email=${email}`);
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <main className="flex flex-col h-full w-full p-8 overflow-y-auto items-center justify-center">
      <ImageBackground image={bg_1} />
      <form
        onSubmit={handleSubmit((data) => signUp(data, states))}
        className="flex flex-col gap-5 min-h-[600px] max-h-full w-[400px] border border-borderColor rounded-lg bg-primary p-8 animate-animfadeAbove"
      >
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-secondary text-3xl">Sign up</h1>

          <div className="flex gap-1 font-light text-accent text-sm">
            <span>{"Already have an account?"}</span>
            <Link href="/sign-in" className="font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-7 w-full">
          <InputText
            formType="SIGNUP"
            errorCatch={errors.username}
            nameRegister="username"
            placeholder="username"
            register={register}
          />

          <InputText
            formType="SIGNUP"
            errorCatch={errors.email}
            nameRegister="email"
            placeholder="email"
            register={register}
          />

          <InputTextPassword
            visiblePassword={visible}
            passwordSetVisible={setVisible}
            errorCatch={errors.password}
            formType="SIGNUP"
            nameRegister="password"
            placeholder="password"
            register={register}
          />

          <InputTextPassword
            visiblePassword={cfrmVisible}
            passwordSetVisible={setCfrmVisible}
            errorCatch={errors.cfrmPassword}
            formType="SIGNUP"
            nameRegister="cfrmPassword"
            placeholder="confirm password"
            register={register}
          />

          <button
            type="submit"
            disabled={processing}
            className={`bg-secondary h-[55px] font-bold text-sm flex justify-center items-center rounded-lg transition-transform duration-300 hover:-translate-y-2 ease-in-out ${
              processing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Create an account
          </button>

          <hr className="border-borderColor" />

          <div className="text-xs text-accent text-center">
            By creating an account you agree to our{" "}
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

export default SignUp;