import { verifyToken } from "@/middleware/authMiddleware";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    // Verify JWT token and retrieve the Bearer token
    const token = verifyToken(req);

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({ where: { token } });

    if (!user) {
      return NextResponse.json(
        { error: "NotFound", message: "User Not Found" },
        { status: 404 }
      );
    }

    const deleteToken = await prisma.user.update({
      where: { id: user.id },
      data: { token: "" },
    });

    if (!deleteToken) {
      return NextResponse.json(
        { error: "Internal Server Error", message: "SignOut Failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Sign Out Successfully", data: deleteToken },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error, message: error.message },
      { status: 401 }
    );
  }
}
