import { verifyToken } from "@/middleware/authMiddleware";
import prisma from "@/lib/prisma";
import { getUserSchema } from "@/validation/auth";
import { getTaskSchema } from "@/validation/task";
import { NextRequest, NextResponse } from "next/server";

type TParams = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params: { id } }: TParams) {
  try {
    // Verify JWT token and retrieve the Bearer token
    const token = verifyToken(req);
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const validation = getUserSchema.safeParse({ userId: id });
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
    const taskData = await prisma.task.findMany({ where: { userId: id } });
    if (!taskData) {
      return NextResponse.json(
        { error: "NotFound", message: "Task Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: taskData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error, message: error.message },
      { status: 403 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: TParams) {
  try {
    // Verify JWT token and retrieve the Bearer token
    const token = verifyToken(req);

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const validation = getTaskSchema.safeParse({ taskId: id });
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

    const deleteTask = await prisma.task.delete({ where: { id } });
    if (!deleteTask) {
      return NextResponse.json(
        { error: "Internal Server Error", message: "Task Deletion Failed" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Tasks Deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error, message: error.message },
      { status: 403 }
    );
  }
}
