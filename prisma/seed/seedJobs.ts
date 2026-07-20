import { PrismaClient } from "@prisma/client/extension";
import { generateAddress } from "./address.factory";
import { generateJob } from "./job.factory";

export async function seedJobs(prisma: PrismaClient, jobsPerProfile = 5) {
  const profiles = await prisma.profile.findMany();

  for (const profile of profiles) {
    for (let i = 0; i < jobsPerProfile; i++) {
      const address = await prisma.address.create({
        data: generateAddress(),
      });

      await prisma.job.create({
        data: {
          ...generateJob(),

          profile: {
            connect: {
              id: profile.id,
            },
          },

          address: {
            connect: {
              id: address.id,
            },
          },
        },
      });
    }
  }
}