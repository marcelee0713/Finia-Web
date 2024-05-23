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
  req: GetActivityRequest
): Promise<ActivityInfo> => {
  const res = await fetch(`${apiUrl}/transactions/`, {
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

  const data: ActivityInfo = await res.json();

  return data;
};

export const GetMonthWiseData = async (
  req: GetActivityRequest
): Promise<MonthlyData> => {
  const res = await fetch(`${apiUrl}/transactions/`, {
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

  const data: MonthlyData = await res.json();

  return data;
};

export const GetCategoryData = async (
  req: GetActivityRequest
): Promise<CategoryData> => {
  const res = await fetch(`${apiUrl}/transactions/`, {
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
