import { prisma } from "@/lib/prisma";
import { Prisma, JobLocationType } from "@/generated/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "20");

  const search = searchParams.get("search");

  const city = searchParams.get("city");
  const province = searchParams.get("province");

  const location = searchParams.get("location");

  const minBudget = searchParams.get("minBudget");
  const maxBudget = searchParams.get("maxBudget");

  const isOpen = searchParams.get("isOpen");

  const sort = searchParams.get("sort") ?? "newest";

  const where: Prisma.JobWhereInput = {};

  // Search
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Address
  if (city || province) {
    where.address = {};

    if (city) {
      where.address.city = city;
    }

    if (province) {
      where.address.province = province;
    }
  }

  // Remote / Hybrid / Onsite
  if (
    location &&
    Object.values(JobLocationType).includes(
      location as JobLocationType
    )
  ) {
    where.locationType = location as JobLocationType;
  }

  // Budget
  if (minBudget || maxBudget) {
    where.budgetMin = {};

    if (minBudget) {
      where.budgetMin.gte = Number(minBudget);
    }

    if (maxBudget) {
      where.budgetMin.lte = Number(maxBudget);
    }
  }

  // Open
  if (isOpen !== null) {
    where.isOpen = isOpen === "true";
  }

  const orderBy: Prisma.JobOrderByWithRelationInput =
    sort === "oldest"
      ? {
          createdAt: "asc",
        }
      : sort === "budget"
      ? {
          budgetMax: "desc",
        }
      : {
          createdAt: "desc",
        };

  const jobs = await prisma.job.findMany({
    where,

    orderBy,

    skip: (page - 1) * limit,

    take: limit,

    select: {
      id: true,

      company: true,

      title: true,
      banner: true,

      budgetMin: true,
      budgetMax: true,

      deadline: true,

      locationType: true,

      createdAt: true,

      isOpen: true,
      isVerified: true,

      tags: true,

      profile: {
        select: {
          displayName: true,
          avatar: true,
        },
      },

      address: {
        select: {
          city: true,
          province: true,
        },
      },
    },
  });

  const total = await prisma.job.count({
    where,
  });

  return Response.json({
    data: jobs,

    pagination: {
      page,
      limit,
      total,

      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const job = await prisma.job.create({
      data: {
        company: body.company,

        title: body.title,
        description: body.description,
        banner: body.banner,

        budgetMin: body.budgetMin,
        budgetMax: body.budgetMax,

        deadline: body.deadline
          ? new Date(body.deadline)
          : null,

        locationType: body.locationType,

        isVerified: body.isVerified ?? false,
        isOpen: body.isOpen ?? true,

        tags: body.tags,

        profile: {
          connect: {
            id: body.profileId,
          },
        },

        ...(body.address && {
          address: {
            create: {
              country: body.address.country,
              province: body.address.province,
              city: body.address.city,
              district: body.address.district,
              village: body.address.village,
              postalCode: body.address.postalCode,
              latitude: body.address.latitude,
              longitude: body.address.longitude,
            },
          },
        }),
      },

      include: {
        profile: true,
        address: true,
      },
    });

    return Response.json(job, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to create job",
      },
      {
        status: 500,
      }
    );
  }
}