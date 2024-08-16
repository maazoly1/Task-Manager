import { z } from "zod";

export const signUpAuthSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name is required"),
  lastName: z.string().min(1, "First name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email(),
  token: z.string().optional(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

// Schema for Forms
export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(4, { message: "First name must be at least 4 characters" }),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .regex(
        /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
        { message: "Invalid email address" }
      ),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be no more than 32 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one digit" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpForm = z.infer<typeof signUpSchema>;

export const signInAuthSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
      { message: "Invalid email address" }
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be no more than 32 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
});

export type TSignInForm = z.infer<typeof signInSchema>;

export const getUserSchema = z.object({
  userId: z
    .string({
      required_error: "User Id is required",
    })
    .min(1, "User Id is required"),
});
