import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import {
  ActivityInfo,
  CategoryData,
  CategoryDataStr,
  GetActivityRequest,
  MonthlyData,
} from "@/interfaces/transaction";

export const GetActivityInfo = async (
  req: GetActivityRequest,
  token?: string
): Promise<ActivityInfo | undefined> => {
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

  if (res.status === 204) return undefined;

  const data: ActivityInfo = await res.json();

  return data;
};

export const GetMonthWiseData = async (
  req: GetActivityRequest,
  token?: string
): Promise<MonthlyData | undefined> => {
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

  if (res.status === 204) return undefined;

  const data: MonthlyData = await res.json();

  return data;
};

export const GetCategoryData = async (
  req: GetActivityRequest,
  token?: string
): Promise<CategoryData | undefined> => {
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

  if (res.status === 204) return undefined;

  const data: CategoryDataStr = await res.json();

  const transformedData: CategoryData = {
    ...data,
    data: data.data.map((item) => ({
      ...item,
      amount: parseFloat(item.amount),
    })),
  };

  return transformedData;
};
