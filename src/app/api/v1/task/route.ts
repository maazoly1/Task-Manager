import { verifyToken } from "@/middleware/authMiddleware";
import prisma from "@/lib/prisma";
import { TTask } from "@/types";
import { createTaskSchema } from "@/validation/task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    // Verify JWT token and retrieve the Bearer token
    const token = verifyToken(req);
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Unauthorized Access" },
        { status: 401 }
      );
    }
    const validation = createTaskSchema.safeParse(req);
    if (!validation.success) {
      return NextResponse.json(
        {
          errors: validation.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        { status: 401 }
      );
    }
    const { data } = validation;
    data.slug = "";
    const taskData = await prisma.task.create({
      data: data as unknown as TTask,
    });

    if (!taskData) {
      return NextResponse.json(
        { message: "Task Submission Failed" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "Task Added Successfully",
        data: taskData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error, message: error.message },
      { status: 401 }
    );
  }
}

export async function PATCH() {}
