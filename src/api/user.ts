import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { CallbacksInterface, ChangePasswordFormData } from "@/interfaces/form";
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

    throw errorObj;
  }

  const user: UserData = await res.json();
  return user;
};

export const getUserPass = async (endpoint: string): Promise<string> => {
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) {
    if (res.status === 429) {
      const err: ErrorResponse = {
        message: "Too much request, try again later!",
        status: "429",
        type: "Too much request already",
      };

      throw err;
    }

    const errorObj: ErrorResponse = await res.json();

    throw errorObj;
  }

  const data: { res: string } = await res.json();

  return data.res;
};

export const changePassword = async (
  data: ChangePasswordFormData,
  userId: string,
  { onLoading, onSuccess, onError }: CallbacksInterface
): Promise<void> => {
  onLoading();

  const res = await fetch(`${apiUrl}/users/change-password`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: userId,
      newPassword: data.password,
      removeSessions: "YES",
    }),
    mode: "cors",
    credentials: "include",
    method: "PATCH",
  });

  if (!res.ok) {
    if (res.status === 429) {
      const err: ErrorResponse = {
        message: "Too much request, try again later!",
        status: "429",
        type: "Too much request already",
      };
      return onError(err);
    }

    const err: ErrorResponse = await res.json();

    return onError(err);
  }

  return onSuccess("Logging you out...");
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

      return onError(err);
    }

    const err: ErrorResponse = await res.json();

    return onError(err);
  }

  return onSuccess("Success");
};
