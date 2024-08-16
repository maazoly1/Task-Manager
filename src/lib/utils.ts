import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getOptionString<T extends object>(
  options: Partial<T>,
  defaultOptions?: T
): string {
  const searchParams = new URLSearchParams();

  // Merge the default options with the provided options if any
  const queryOptions = { ...defaultOptions, ...options };

  Object.keys(queryOptions).forEach((key) => {
    searchParams.set(key, `${queryOptions[key as keyof T]}`);
  });

  return searchParams.toString();
}

export interface SessionResponse {
  token: string;
}

export function setTokens(data: SessionResponse) {
  const cki = cookies();

  const accessToken = jwt.decode(data.token, {
    json: true,
  });

  if (!accessToken || !accessToken.exp || !accessToken.iat) {
    throw new Error("Invalid token");
  }

  cki.set("ACCESS_TOKEN", data.token, {
    path: "/",
    maxAge: accessToken.exp - accessToken.iat,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}

export function getAccessToken() {
  const cki = cookies();
  const accessToken = cki.get("ACCESS_TOKEN");

  if (accessToken) {
    return accessToken.value;
  }

  // redirectOnError: boolean = true,
  // pathname: string = ""
  // const redirectUrl = `${
  //   new URL(headers().get("referer") as string).origin
  // }/signin${pathname ? `?redirect=${pathname}` : ""}`;

  // if (!accessToken && redirectUrl.includes("redirect") && !redirectOnError) {
  //   redirect(redirectUrl);
  // }

  return "";
}

export function deleteAccessToken() {
  const cki = cookies();
  cki.delete("ACCESS_TOKEN");
}
