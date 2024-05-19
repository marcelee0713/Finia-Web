import { ResetPassFormData } from "@/interfaces/form";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface props {
  placeholder: string;
  inputType?: string;
  register: UseFormRegister<ResetPassFormData>;
  errorCatch: FieldError | undefined;
  nameRegister: "password" | "cfrmPassword";
  visiblePassword?: boolean;
  passwordSetVisible: Dispatch<SetStateAction<boolean>>;
}

export const ResetPasswordInput: React.FC<props> = ({
  errorCatch,
  placeholder,
  nameRegister,
  register,
  inputType,
  visiblePassword,
  passwordSetVisible,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center relative text-sm">
        <input
          id={placeholder}
          type={visiblePassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="off"
          className={`${!errorCatch && "border border-borderColor"} ${
            errorCatch && "border-2 border-borderColor"
          } outline-none bg-transparent w-full px-3 pr-10 text-accent font-bold rounded-lg h-[55px] font-openSans placeholder:font-normal`}
          {...register(nameRegister)}
        />
        {!visiblePassword && (
          <FaEyeSlash
            className="absolute right-0 mr-2 text-secondary"
            size={25}
            onClick={() => passwordSetVisible(true)}
          />
        )}
        {visiblePassword && (
          <FaEye
            className="absolute right-0 mr-2 text-secondary"
            size={25}
            onClick={() => passwordSetVisible(false)}
          />
        )}
      </div>
      <span
        className={`text-rose-400 duration-300 opacity-0 ease-in text-xs font-openSans ${
          errorCatch && `opacity-100`
        }`}
      >
        {errorCatch && errorCatch.message}
      </span>
    </div>
  );
};
