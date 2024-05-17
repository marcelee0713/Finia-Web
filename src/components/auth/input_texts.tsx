import { SignInFormData, SignUpFormData } from "@/interfaces/form";
import {
  RegisterType,
  AuthFormType,
  EnumRegisterType,
  SignInEnums,
  SignUpEnums,
} from "@/types/auth";
import { registerEnum, registerWithType } from "@/utils/register_types";
import React, { Dispatch, SetStateAction } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface props {
  placeholder: string;
  inputType?: string;
  register: RegisterType<AuthFormType>;
  errorCatch: FieldError | undefined;
  formType: AuthFormType;
  nameRegister: EnumRegisterType<AuthFormType>;
}

interface passwordProps {
  placeholder: string;
  register: RegisterType<AuthFormType>;
  inputType?: string;
  errorCatch: FieldError | undefined;
  formType: AuthFormType;
  nameRegister: EnumRegisterType<AuthFormType>;
  visiblePassword?: boolean;
  passwordSetVisible: Dispatch<SetStateAction<boolean>>;
}

const InputText: React.FC<props> = ({
  placeholder,
  errorCatch,
  nameRegister,
  inputType,
  formType,
  register,
}) => {
  const signInRegister = registerWithType(
    "SIGNIN",
    register
  ) as UseFormRegister<SignInFormData>;

  const signUpRegister = registerWithType(
    "SIGNUP",
    register
  ) as UseFormRegister<SignUpFormData>;

  const signInEnum = registerEnum("SIGNIN", nameRegister) as SignInEnums;

  const signUpEnum = registerEnum("SIGNUP", nameRegister) as SignUpEnums;

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
        {...(formType === "SIGNIN"
          ? signInRegister(signInEnum)
          : signUpRegister(signUpEnum))}
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

const InputTextPassword: React.FC<passwordProps> = ({
  visiblePassword,
  passwordSetVisible,
  errorCatch,
  nameRegister,
  placeholder,
  register,
  formType,
}) => {
  const signInRegister = registerWithType(
    "SIGNIN",
    register
  ) as UseFormRegister<SignInFormData>;

  const signUpRegister = registerWithType(
    "SIGNUP",
    register
  ) as UseFormRegister<SignUpFormData>;

  const signInEnum = registerEnum("SIGNIN", nameRegister) as SignInEnums;

  const signUpEnum = registerEnum("SIGNUP", nameRegister) as SignUpEnums;

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
          {...(formType === "SIGNIN"
            ? signInRegister(signInEnum)
            : signUpRegister(signUpEnum))}
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

export { InputText, InputTextPassword };
