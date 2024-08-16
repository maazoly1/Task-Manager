import { verifyToken } from "@/middleware/authMiddleware";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Verify JWT token and retrieve the Bearer token
    const token = verifyToken(req);

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const data = await prisma.user.findFirst({ where: { token } });

    if (!data) {
      return NextResponse.json(
        { error: "NotFound", message: "User Not Found" },
        { status: 404 }
      );
    }

    if (data.token !== token) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error, message: error.message },
      { status: 401 }
    );
  }
}
