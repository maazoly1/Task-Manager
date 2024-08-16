"use server";

import { getAccessToken } from "@/lib/utils";
import { TCommonError, TTask } from "@/types";
import { TTaskSchema } from "@/validation/task";
import { revalidateTag } from "next/cache";

type TTaskResonse = {
  data: TTask;
};

export async function actionGetTasks(
  userId: string
): Promise<TTaskResonse | TCommonError> {
  const accessToken = getAccessToken();

  if (accessToken) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/task/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ["tasks"],
        },
      }
    );

    const data = await res.json();
    return data;
  }
  return {
    error: "Unauthorized",
    message: "Accesss Token is Missing",
  };
}

export type TTaskResponse = {
  message: string;
  data: TTask;
};

export async function actionAddTask(
  formData: TTaskSchema
): Promise<TTaskResponse | TCommonError> {
  const accessToken = getAccessToken();
  if (accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    revalidateTag("tasks");
    return data;
  }
  return {
    error: "Unauthorized",
    message: "Accesss Token is Missing",
  };
}

type TDeleteTaskResponse = {
  message: string;
};

export async function actionDeleteTask(
  id: string
): Promise<TDeleteTaskResponse | TCommonError> {
  const accessToken = getAccessToken();
  if (accessToken) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/task/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();
    revalidateTag("tasks");
    return data;
  }
  return {
    error: "Unauthorized",
    message: "Accesss Token is Missing",
  };
}
