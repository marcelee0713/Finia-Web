import { SignInFormData, SignUpFormData } from "@/interfaces/form";
import {
  AuthFormType,
  RegisterType,
  EnumRegisterType,
  SignInEnums,
  SignUpEnums,
} from "@/types/auth";
import { UseFormRegister } from "react-hook-form";

const registerWithType = (
  formType: AuthFormType,
  register: RegisterType<AuthFormType>
): UseFormRegister<SignInFormData> | UseFormRegister<SignUpFormData> => {
  if (formType === "SIGNIN") {
    return register as UseFormRegister<SignInFormData>;
  }

  return register as UseFormRegister<SignUpFormData>;
};

const registerEnum = (
  formType: AuthFormType,
  enumType: EnumRegisterType<AuthFormType>
): SignInEnums | SignUpEnums => {
  if (formType === "SIGNIN") {
    return enumType as SignInEnums;
  }

  return enumType as SignUpEnums;
};

export { registerWithType, registerEnum };
