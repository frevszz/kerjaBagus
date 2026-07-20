import { prisma } from "@/lib/prisma";

export async function GET() {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
      address: true,
    },
  });

  return Response.json(profiles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const profile = await prisma.profile.create({
      data: {
        displayName: body.displayName,
        username: body.username,

        avatar: body.avatar,
        headline: body.headline,
        bio: body.bio,

        website: body.website,
        github: body.github,
        linkedin: body.linkedin,
        portfolio: body.portfolio,

        hourlyRate: body.hourlyRate,
        currency: body.currency,

        user: {
          connect: {
            id: body.userId,
          },
        },

        ...(body.address && {
          address: {
            create: body.address,
          },
        }),
      },

      include: {
        user: true,
        address: true,
      },
    });

    return Response.json(profile, {
      status: 201,
    });
  } catch {
    return Response.json(
      {
        message: "Failed to create profile"
      },
      {
        status: 500,
      }
    );
  }
}