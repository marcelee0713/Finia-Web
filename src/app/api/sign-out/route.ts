import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const res = await fetch(`${apiUrl}/users/logout?token=${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    method: "DELETE",
  });

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

  return new Response("Successfully logged out!", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
