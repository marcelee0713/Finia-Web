import { ErrorResponse } from "./error";

export interface SignInFormData {
  username: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  cfrmPassword: string;
  password: string;
}

export interface ForgotPassFormData {
  email: string;
}

export interface ResetPassFormData {
  password: string;
  cfrmPassword: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  password: string;
  cfrmPassword: string;
}

export interface CallbacksInterface {
  onLoading: () => void;
  onSuccess: (result: string) => void;
  onError: (result: ErrorResponse) => void;
}
