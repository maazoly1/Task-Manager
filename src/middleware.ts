import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./types/constant";
import { actionSignout } from "./actions/authAction";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedRoutes = PROTECTED_ROUTES.includes(path);
  const session = cookies().get("ACCESS_TOKEN");

  if (!session && protectedRoutes) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (!!session && !protectedRoutes) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Allow the request to proceed if no redirects are needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
