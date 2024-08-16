import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  userId: z.string().min(1, "User Should be Logged In"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().optional(),
  completed: z.boolean().optional(),
  taskDate: z.string().min(1, "Date is required"),
});

export const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  userId: z.string().min(1, "User Should be Logged In"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().optional(),
  completed: z.boolean().optional(),
  taskDate: z.date({ message: "Task Date is required" }),
});

export type TTaskSchema = z.infer<typeof TaskFormSchema>;

export const getTaskSchema = z.object({
  taskId: z
    .string({
      required_error: "Task Id is required",
    })
    .min(1, "Task Id is required"),
});
