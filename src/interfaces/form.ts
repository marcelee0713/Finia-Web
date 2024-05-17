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

export interface CallbacksInterface {
  onLoading: () => void;
  onSuccess: (result: string) => void;
  onError: (result: ErrorResponse) => void;
}
