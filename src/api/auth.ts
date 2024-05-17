import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { CallbacksInterface, SignInFormData } from "@/interfaces/form";

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
