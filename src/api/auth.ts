import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import {
  CallbacksInterface,
  ForgotPassFormData,
  SignInFormData,
  SignUpFormData,
} from "@/interfaces/form";

export const signIn = async (
  data: SignInFormData,
  { onLoading, onError, onSuccess }: CallbacksInterface
): Promise<void> => {
  onLoading();

  const username = data.username;

  const password = data.password;

  const res = await fetch(`${apiUrl}/users/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    method: "POST",
  });

  if (!res.ok) {
    const err: ErrorResponse = await res.json();
    onError(err);
    return;
  }

  return onSuccess(`Redirecting...`);
};

export const signUp = async (
  data: SignUpFormData,
  { onLoading, onError, onSuccess }: CallbacksInterface
): Promise<void> => {
  onLoading();

  const username = data.username;

  const email = data.email;

  const password = data.password;

  const res = await fetch(`${apiUrl}/users/create`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
    method: "POST",
  });

  if (!res.ok) {
    const err: ErrorResponse = await res.json();
    onError(err);
    return;
  }

  return onSuccess(`${username}:${email}`);
};

export const emailVerify = async (
  endpoint: string,
  token: string
): Promise<void> => {
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
    mode: "cors",
    credentials: "include",
    method: "POST",
  });

  if (!res.ok) {
    const err: ErrorResponse = await res.json();

    throw err;
  }
};

export const emailVerificationRequest = async (
  username: string,
  { onLoading, onError, onSuccess }: CallbacksInterface
): Promise<void> => {
  onLoading();

  const res = await fetch(`${apiUrl}/users/req-email-verification`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      username: username,
    }),
    method: "POST",
  });

  if (!res.ok) {
    if (res.status === 429) {
      const err: ErrorResponse = {
        message: "Too much request, try again later!",
        status: "429",
        type: "Too much request already",
      };
      onError(err);
      return;
    }

    const err: ErrorResponse = await res.json();
    onError(err);
    return;
  }

  return onSuccess(
    "We have sent you an email verification to your email address."
  );
};

export const resetPasswordRequest = async (
  data: ForgotPassFormData,
  { onLoading, onError, onSuccess }: CallbacksInterface
): Promise<void> => {
  onLoading();

  const res = await fetch(`${apiUrl}/users/req-reset-password`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
    }),
    method: "POST",
  });

  if (!res.ok) {
    if (res.status === 429) {
      const err: ErrorResponse = {
        message: "Too much request, try again later!",
        status: "429",
        type: "Too much request already",
      };
      onError(err);
      return;
    }

    const err: ErrorResponse = await res.json();
    onError(err);
    return;
  }

  return onSuccess(
    "We have sent you a link for password reset to your email address."
  );
};
