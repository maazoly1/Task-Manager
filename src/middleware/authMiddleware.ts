import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Middleware function to verify JWT token and return the token itself
export function verifyToken(req: NextRequest) {
  // Define the secret key type
  const secretKey = process.env.SECRET_KEY;
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return "";
  }
  const token = authorization?.split(" ")[1];
  const decoded = jwt.verify(token, secretKey as string);
  if (!token || !decoded) {
    return "";
  }
  return token;
}
