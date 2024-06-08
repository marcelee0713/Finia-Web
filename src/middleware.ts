import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const haveToken = cookies().has("token");

  const pathname = req.nextUrl.pathname;

  const onAuthPages =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/greet");

  const onUserPages =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/profile");

  if (haveToken) {
    if (pathname === "/" || onAuthPages) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    if (pathname === "/") {
      return NextResponse.next();
    }

    if (onUserPages) {
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
    "/profile",
    "/transactions",
  ],
};
