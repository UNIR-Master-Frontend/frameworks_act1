import { NextResponse } from "next/server";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/config/i18n";
import { auth0 } from "./lib/auth0";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    return await auth0.middleware(request);
  }

  const pathnameHasLanguage = SUPPORTED_LANGUAGES.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );

  if (pathnameHasLanguage) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANGUAGE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|video|favicon.ico|.*\\.).*)",
  ],
};
