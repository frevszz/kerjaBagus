import { seedUsers } from "./seed/seedUsers";
import { seedJobs } from "./seed/seedJobs";
import { prisma } from "@/lib/prisma";


async function main() {
  await seedUsers(prisma, 5);

  await seedJobs(prisma, 2);

  console.log("Database seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });