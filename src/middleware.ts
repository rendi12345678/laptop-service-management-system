import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "next-auth.session-token";
const ROOT = "/";
const PUBLIC_ROUTES: string[] = ["/"];

function handleRedirection(req: NextRequest, redirectUrl: string): NextResponse {
  return NextResponse.redirect(new URL(redirectUrl, req.nextUrl));
}

export default function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = !!token;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute) {
    return handleRedirection(req, ROOT);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', "/admin/:path*", "/worker/:path*"],
};
