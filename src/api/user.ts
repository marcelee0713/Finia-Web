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
    const errorObj: ErrorResponse = await res.json();

    onError(errorObj);

    const error = new Error(errorObj.message);
    throw error;
  } else {
    onSuccess("Success");
  }
};
