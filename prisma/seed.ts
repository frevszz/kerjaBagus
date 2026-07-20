import { seedUsers } from "./seed/seedUsers";
import { seedJobs } from "./seed/seedJobs";
import { prisma } from "@/lib/prisma";


async function main() {
  await seedUsers(prisma, 50);

  await seedJobs(prisma, 10);

  console.log("Database seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });