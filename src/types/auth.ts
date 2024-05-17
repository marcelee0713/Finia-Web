import { SignInFormData, SignUpFormData } from "@/interfaces/form";
import { UseFormRegister } from "react-hook-form";

export type SignInEnums = "username" | "password";

export type SignUpEnums = "username" | "email" | "cfrmPassword" | "password";

export type AuthFormType = "SIGNIN" | "SIGNUP";

export type EnumRegisterType<AuthFormType> = AuthFormType extends "SIGNIN"
  ? SignInEnums
  : SignUpEnums;

export type RegisterType<AuthFormType> = AuthFormType extends "SIGNIN"
  ? UseFormRegister<SignInFormData>
  : UseFormRegister<SignUpFormData>;
