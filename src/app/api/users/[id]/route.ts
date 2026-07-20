import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Context
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      profile: true,
    },
  });

  if (!user) {
    return Response.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  return Response.json(user);
}

export async function PATCH(
  request: Request,
  { params }: Context
) {
  const { id } = await params;

  const body = await request.json();

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },

      data: {
        email: body.email,

        isClient: body.isClient,
        isFreelancer: body.isFreelancer,
        isAdmin: body.isAdmin,
      },

      include: {
        profile: true,
      },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Context
) {
  const { id } = await params;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return Response.json({
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }
}