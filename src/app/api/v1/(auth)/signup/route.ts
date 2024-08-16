import { signUpAuthSchema } from "@/validation/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { TUser } from "@/types";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validation = signUpAuthSchema.safeParse(req);

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
    const saltRound = process.env.SALT_ROUND;
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = process.env.EXP_1D;
    const salt = await bcrypt.genSalt(Number(saltRound));

    // // TODO: we can make the salt round dynamic and assign it to the user
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
    data.token = "";
    const userData = await prisma.user.create({ data: data as TUser });

    const payload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
    const token = jwt.sign(payload, secretKey as any, {
      expiresIn: expiresIn,
    });

    // update token in newly create user
    const updatedData = await prisma.user.update({
      where: { id: userData.id },
      data: { token },
    });

    if (userData) {
      return NextResponse.json(
        { message: "User registered successfully", data: updatedData, token },
        { status: 201 }
      );
    }
  } catch (error: any) {
    // P2002 is the error code for unique constraint violation
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Handle the error as needed, e.g., return a user-friendly message
      return NextResponse.json(
        { error: error.code, message: "Email already Exist" },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { error: error.error, message: error.message },
        { status: 401 }
      );
    }
  }
}
