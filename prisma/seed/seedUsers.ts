import { PrismaClient } from "@prisma/client/extension";
import { generateAddress } from "./address.factory";
import { generateProfile } from "./profile.factory";
import { generateUser } from "./user.factory";

export async function seedUsers(prisma: PrismaClient, amount = 20) {
  for (let i = 0; i < amount; i++) {
    const address = await prisma.address.create({
      data: generateAddress(),
    });

    const user = await prisma.user.create({
      data: generateUser(),
    });

    await prisma.profile.create({
      data: {
        ...generateProfile(),

        user: {
          connect: {
            id: user.id,
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