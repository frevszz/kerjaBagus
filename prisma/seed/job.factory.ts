import { JobLocationType } from "@/generated/prisma/enums";
import { faker } from "@faker-js/faker";

export function generateJob() {
  const min = faker.number.int({
    min: 1_000_000,
    max: 10_000_000,
  });

  return {
    title: faker.person.jobTitle(),

    description: faker.lorem.paragraphs(3),

    banner: faker.image.urlPicsumPhotos(),

    budgetMin: min,

    budgetMax:
      min +
      faker.number.int({
        min: 500000,
        max: 5000000,
      }),

    deadline: faker.date.soon(),

    isOpen: true,

    locationType: faker.helpers.arrayElement([
      JobLocationType.REMOTE,
      JobLocationType.ONSITE,
      JobLocationType.HYBRID,
    ]),
  };
}