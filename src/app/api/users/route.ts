import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });

  return Response.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hashedPassword = await bcrypt.hash(body.passwordHash, 12);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        phone: body.phone,
        passwordHash: hashedPassword,

        isClient: body.isClient ?? false,
        isFreelancer: body.isFreelancer ?? true,
        isAdmin: body.isAdmin ?? false,
      },

      include: {
        profile: true,
      },
    });

    return Response.json(user, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}