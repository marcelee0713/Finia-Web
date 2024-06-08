import { NextRequest } from "next/server";
import apiUrl from "@/config";
import { SignInFormData } from "@/interfaces/form";
import { ErrorResponse } from "@/interfaces/error";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body: SignInFormData = await req.json();

  const res = await fetch(`${apiUrl}/users/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(body),
    method: "POST",
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

  const obj: { token: string } = await res.json();

  cookies().set("token", obj.token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
    secure: true,
    sameSite: "lax",
  });

  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
