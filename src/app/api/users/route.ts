import { prisma } from "@/lib/prisma";

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

    const user = await prisma.user.create({
      data: {
        email: body.email,
        passwordHash: body.passwordHash,

        isClient: body.isClient ?? true,
        isFreelancer: body.isFreelancer ?? false,
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