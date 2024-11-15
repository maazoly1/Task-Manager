import { DEFAULT_LANG, LOCALES } from "@/types/constant";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { headers as nextHeaders, cookies as nextCookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function getLocale() {
  const cookies = nextCookies();
  const language = cookies.get("LANG");
  const validLanguage = !!language && LOCALES.includes(language.value);
  console.log(validLanguage);
  if (validLanguage) return language.value;

  const headers = {
    "accept-language": nextHeaders().get("accept-language") || "",
  };

  const languages = new Negotiator({ headers }).languages();
  const locale = match(languages, LOCALES, DEFAULT_LANG); // -> 'en-US';
  return locale;
}

export default async function middlewareIntl(
  request: NextRequest
): Promise<NextResponse | void> {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameLocale = LOCALES.find(
    // /ar/login
    // /login
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    request.nextUrl.pathname = pathname.replace(`/${pathnameLocale}`, "");
    const response = NextResponse.redirect(request.nextUrl);
    const cookieLang = request.cookies.get("LANG")?.value;
    if (cookieLang !== pathnameLocale) {
      response.cookies.set("LANG", pathnameLocale);
    }

    return response;
  }

  // Rewrite the URL to include the determined locale
  const locale = getLocale(); // /ar

  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.rewrite(request.nextUrl);
}
