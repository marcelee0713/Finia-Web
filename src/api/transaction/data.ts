import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { GetActivityRequest, Transaction } from "@/interfaces/transaction";

export const GetTransactions = async (
  req: GetActivityRequest
): Promise<Transaction[] | undefined> => {
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

  if (res.status === 204) return undefined;

  const data: Transaction[] = await res.json();

  return data;
};
