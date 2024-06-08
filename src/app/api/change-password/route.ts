import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface body {
  uid: string;
  newPassword: string;
  removeSessions: "YES" | "NO";
  token: string;
}

export async function PATCH(req: NextRequest) {
  const obj: body = await req.json();

  const res = await fetch(
    `${apiUrl}/users/change-password?token=${obj.token}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: obj.uid,
        newPassword: obj.newPassword,
        removeSessions: obj.removeSessions,
      }),
      mode: "cors",
      credentials: "include",
      method: "PATCH",
    }
  );

  if (!res.ok) {
    const errorObj: ErrorResponse = await res.json();

    return new Response(JSON.stringify(errorObj), {
      status: parseInt(errorObj.status),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  cookies().delete("token");

  return new Response(JSON.stringify(await res.json()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
