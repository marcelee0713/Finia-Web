import apiUrl from "@/config";
import { ErrorResponse } from "@/interfaces/error";
import { UserData } from "@/interfaces/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import cookie from "cookie";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (!token) {
    const err: ErrorResponse = {
      message: "Unauthorized",
      status: "401",
      type: "not-authorized",
    };

    cookies().delete("token");

    return new NextResponse(JSON.stringify(err), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    const res = await fetch(`${apiUrl}/users?token=${token.value}`);

    if (!res.ok) {
      const errorObj: ErrorResponse = await res.json();

      return new Response(JSON.stringify(errorObj), {
        status: parseInt(errorObj.status),
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie.serialize("token", "", {
            httpOnly: true,
            maxAge: 0,
            secure: true,
            sameSite: "lax",
          }),
        },
      });
    }

    const user: UserData = await res.json();

    cookies().set("token", user ? user.token : "", {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      secure: true,
      sameSite: "lax",
    });

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
