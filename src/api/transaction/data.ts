import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { CallbacksInterface, TransactionFormData } from "@/interfaces/form";
import {
  GetActivityRequest,
  Transaction,
  TransactionData,
  TransactionDataRes,
  TransactionRes,
} from "@/interfaces/transaction";

export const CreateTransaction = async (
  body: TransactionFormData,
  { onLoading, onError, onSuccess }: CallbacksInterface,
  token?: string
): Promise<void> => {
  onLoading();

  const res = await fetch(`${apiUrl}/transactions/create?token=${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    mode: "cors",
    credentials: "include",
    method: "POST",
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

  const stringedJsonResponse = JSON.stringify(await res.json());

  return onSuccess(stringedJsonResponse);
};

export const GetTransactions = async (
  req: GetActivityRequest,
  token?: string
): Promise<TransactionData> => {
  const res = await fetch(`${apiUrl}/transactions?token=${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
    mode: "cors",
    credentials: "include",
    method: "POST",
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

    const err: ErrorResponse = await res.json();
    throw err;
  }

  const dataStrType: TransactionDataRes = await res.json();

  const data: TransactionData = {
    ...dataStrType,
    data: [],
  };

  dataStrType.data.forEach((val) => {
    data.data.push({
      ...val,
      amount: parseFloat(val.amount),
    });
  });

  return data;
};

export const UpdateTransaction = async (
  body: TransactionFormData,
  { onLoading, onError, onSuccess }: CallbacksInterface,
  token?: string
): Promise<void> => {
  onLoading();

  const res = await fetch(`${apiUrl}/transactions?token=${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

  const stringedJsonResponse = JSON.stringify(await res.json());

  return onSuccess(stringedJsonResponse);
};

export const DeleteTransaction = async (
  uid: string,
  { onLoading, onError, onSuccess }: CallbacksInterface,
  token?: string
): Promise<void> => {
  onLoading();

  const res = await fetch(`${apiUrl}/transactions?token=${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: uid,
    }),
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

  return onSuccess("Deleted");
};
