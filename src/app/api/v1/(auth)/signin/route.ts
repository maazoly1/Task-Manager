import prisma from "@/lib/prisma";
import { signInAuthSchema } from "@/validation/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validation = signInAuthSchema.safeParse(req);
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

    const data = validation.data;

    const secretKey = process.env.SECRET_KEY;
    const expiresIn = process.env.EXP_1D;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    // If user is not found, return an error
    if (!user) {
      return NextResponse.json(
        { error: "NotFound", message: "User Not Found" },
        { status: 401 }
      );
    }

    // Compare the entered password with the hashed password in the database
    const match = await bcrypt.compare(data.password, user.password);

    // If passwords do not match, return an error
    if (!match) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = jwt.sign(payload, secretKey as any, {
      expiresIn: expiresIn,
    });

    // update token in newly create user
    const updatedData = await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    return NextResponse.json({
      message: "Logged in successfully",
      data: updatedData,
      token,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.error, message: error.message },
      { status: 401 }
    );
  }
}
