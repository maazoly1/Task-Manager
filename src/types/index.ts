import { User, Task } from "@prisma/client";

export type TUser = User;
export type TTask = Task;

export type TCommonError = {
  error: string;
  message: string | any;
};
