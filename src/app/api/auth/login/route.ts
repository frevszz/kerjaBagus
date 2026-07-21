import { signAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return Response.json(
      { message: "Email atau password salah" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(
    body.password,
    user.passwordHash
  );

  if (!valid) {
    return Response.json(
      { message: "Email atau password salah" },
      { status: 401 }
    );
  }

  const token = await signAccessToken(user.id);

  const response = NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isClient: user.isClient,
      isFreelancer: user.isFreelancer,
    },
  });

  response.cookies.set({
    name: "access_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;  
}