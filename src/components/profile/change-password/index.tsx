import { CallbacksInterface, ChangePasswordFormData } from "@/interfaces/form";
import { ChangePassSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordInput } from "./input";
import { toast } from "sonner";
import { changePassword } from "@/api/user";
import * as bycrypt from "bcryptjs";
import { useGlobalContext } from "@/app/context/provider";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import apiUrl from "@/config";

interface props {
  userId: string;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentPassword: string;
}

export const ChangePassword = ({
  setModal,
  currentPassword,
  userId,
}: props) => {
  const router = useRouter();

  const { setUser } = useGlobalContext();

  const [visible, setVisible] = useState(false);

  const [cfrmVisible, setCfrmVisible] = useState(false);

  const [currentVisible, setCurrentVisible] = useState(false);

  const [processing, setProcessing] = useState(false);

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

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
    onSuccess() {
      setProcessing(false);
      router.replace("/sign-in");
      setUser(null);
      mutate(`${apiUrl}/users/get-password`);
      toast.dismiss();
    },
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePassSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!checked) {
      toast.info("Check the checkbox to proceed!");
      return;
    }

    if (!(await bycrypt.compare(data.currentPassword, currentPassword))) {
      setError("currentPassword", {
        message: "Current password is not the same!",
      });
      return;
    }

    if (data.currentPassword === data.password) {
      setError("password", {
        message: "Current password and new password is the same?!",
      });
      return;
    }

    await changePassword(data, userId, callback);
  };

  const preventEnterKeySubmission = (
    e: React.KeyboardEvent<HTMLFormElement>
  ) => {
    const target = e.target;
    if (e.key === "Enter" && target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-opacity-80 bg-primary w-full h-full z-10 flex items-center justify-center px-2 py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={preventEnterKeySubmission}
        className="flex flex-col gap-5 h-auto max-h-full w-[400px] border border-borderColor rounded-lg bg-primary p-5 py-6 lg:p-8 overflow-y-auto no-scrollbar animate-animfadeAbove"
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 text-secondary justify-between items-center">
            <h1 className="font-bold text-3xl">Change Password</h1>

            <button
              onClick={() => {
                if (!processing) {
                  setModal(false);
                }
              }}
              className="transition-transform hover:scale-125 ease-in-out"
            >
              X
            </button>
          </div>
          <div className="text-xs text-secondary">
            {
              "Password should be at least 8 character(s), 1 special character, 1 number, and 1 capital letter"
            }
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-7 w-full">
          <ChangePasswordInput
            errorCatch={errors.currentPassword}
            nameRegister="currentPassword"
            visiblePassword={currentVisible}
            passwordSetVisible={setCurrentVisible}
            placeholder="current password"
            register={register}
          />

          <ChangePasswordInput
            errorCatch={errors.password}
            nameRegister="password"
            visiblePassword={visible}
            passwordSetVisible={setVisible}
            placeholder="new password"
            register={register}
          />

          <ChangePasswordInput
            errorCatch={errors.cfrmPassword}
            nameRegister="cfrmPassword"
            visiblePassword={cfrmVisible}
            passwordSetVisible={setCfrmVisible}
            placeholder="re-enter new password"
            register={register}
          />

          <div className="flex gap-5 items-center justify-center w-full">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              className="appearance-none h-5 w-5 border-2 border-secondary checked:accent-secondary checked:appearance-auto"
            />

            <div className="text-secondary text-sm font-light">
              Check to confirm that you are changing your password.
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className={`bg-secondary text-primary h-[55px] font-bold text-sm flex justify-center items-center rounded-lg transition-transform duration-300 hover:-translate-y-2 ease-in-out ${
              processing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>

          <hr className="border-borderColor" />

          <div className="text-sm text-accent font-light text-center">
            This will{" "}
            <span className="font-bold">log out all of your devices</span> that
            are currently logged in
          </div>
        </div>
      </form>
    </div>
  );
};
