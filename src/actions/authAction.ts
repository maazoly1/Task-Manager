"use server";

import { deleteAccessToken, getAccessToken, setTokens } from "@/lib/utils";
import { TCommonError, TUser } from "@/types";
import { TSignInForm, TSignUpForm } from "@/validation/auth";
import { revalidateTag } from "next/cache";

export type TAuthTokenResponse = {
  message: string;
  data: TUser;
  token: string;
};

export async function actionPostSignup(
  formData: TSignUpForm
): Promise<TAuthTokenResponse | TCommonError> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  revalidateTag("actionGetAuthUsers");

  if ("token" in data) {
    setTokens({ token: data.token });
  }
  return data;
}

export async function actionPostSignin(
  formData: TSignInForm
): Promise<TAuthTokenResponse | TCommonError> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  revalidateTag("actionGetAuthUsers");

  if ("token" in data) {
    setTokens({ token: data.token });
  }
  return data;
}

export type TAuthUserResponse = {
  message?: string;
  data: TUser;
};

export async function actionGetAuthUser(): Promise<
  TAuthUserResponse | TCommonError
> {
  const accessToken = getAccessToken();

  if (accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ["actionGetAuthUsers"],
      },
    });

    const data = await res.json();
    return data;
  }
  return {
    error: "Unauthorized",
    message: "Accesss Token is Missing",
  };
}

export async function actionSignout(): Promise<
  TAuthUserResponse | TCommonError
> {
  const accessToken = getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/signout`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  revalidateTag("actionGetAuthUsers");
  if ("data" in data) {
    deleteAccessToken();
  }
  return data;
}
