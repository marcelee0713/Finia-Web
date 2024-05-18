import { ForgotPassFormData } from "@/interfaces/form";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface props {
  placeholder: string;
  inputType?: string;
  register: UseFormRegister<ForgotPassFormData>;
  errorCatch: FieldError | undefined;
  nameRegister: "email";
}

export const ForgotPasswordInput: React.FC<props> = ({
  errorCatch,
  placeholder,
  nameRegister,
  register,
  inputType,
}) => {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <input
        type={inputType ?? "text"}
        id={placeholder}
        autoComplete="off"
        placeholder={placeholder}
        className={`${!errorCatch && "border border-borderColor"} ${
          errorCatch && "border-2 border-borderColor"
        } outline-none bg-transparent  px-3 text-accent font-bold rounded-lg h-[55px] font-openSans placeholder:font-normal`}
        {...register(nameRegister)}
      />
      <span
        className={`font-openSans text-rose-400 duration-300 opacity-0 ease-in text-xs ${
          errorCatch && `opacity-100`
        }`}
      >
        {errorCatch && errorCatch.message}
      </span>
    </div>
  );
};
