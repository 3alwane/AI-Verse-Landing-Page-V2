import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Public pages that do NOT require login
  const publicPages = ["/", "/login", "/register"];

  // If route is public, allow access
  if (publicPages.includes(pathname)) {
    if (token && (pathname === "/login" || pathname === "/register")) {
      // logged in user trying to access auth page → redirect home
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Otherwise, route is protected
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    // Use pathname + search instead of full URL
    loginUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/all-notes/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
