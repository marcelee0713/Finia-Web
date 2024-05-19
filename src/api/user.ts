import { ErrorResponse } from "@/interfaces/error";
import { CallbacksInterface } from "@/interfaces/form";
import { UserData } from "@/interfaces/user";

export const getUserData = async (endpoint: string): Promise<UserData> => {
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) {
    const errorObj: ErrorResponse = await res.json();

    const error = new Error(errorObj.message);
    throw error;
  }

  const user: UserData = await res.json();
  return user;
};

export const logOut = async (
  endpoint: string,
  { onLoading, onSuccess, onError }: CallbacksInterface
): Promise<void> => {
  onLoading();

  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    method: "DELETE",
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
    return onError(err);
  }

  return onSuccess("Success");
};
