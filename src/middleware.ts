import { NextResponse, NextRequest } from "next/server";
import { jwtVerify, errors } from "jose";
import path from "path";
const secret = process.env.ACCESS_TOKEN_SECRET_KEY;

export async function middleware(req: NextRequest) {
  const haveToken = req.cookies.has("token");

  const pathname = req.nextUrl.pathname;

  const next = NextResponse.next();

  const signIn = new URL("/sign-in", req.url);

  const onAuthPages =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email");

  if (haveToken) {
    const token = req.cookies.get("token");
    if (pathname === "/" || onAuthPages) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    await jwtVerify(token ? token.value : "", new TextEncoder().encode(secret))
      .then((val) => {
        return next;
      })
      .catch((err) => {
        if (err instanceof errors.JWTExpired) {
          return next;
        }

        req.cookies.delete("token");

        return NextResponse.redirect(signIn);
      });
  } else {
    if (pathname === "/") {
      return next;
    }

    if (!onAuthPages) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/greet",
    "/dashboard",
  ],
};
