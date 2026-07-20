import { faker } from "@faker-js/faker";

export function generateProfile() {
  return {
    displayName: faker.person.fullName(),

    username:
      faker.internet.username().toLowerCase() +
      faker.number.int({ min: 1000, max: 9999 }),

    avatar: faker.image.avatar(),

    headline: faker.person.jobTitle(),

    bio: faker.lorem.paragraph(),

    website: faker.internet.url(),
    github: `https://github.com/${faker.internet.username()}`,
    linkedin: `https://linkedin.com/in/${faker.internet.username()}`,
    portfolio: faker.internet.url(),

    hourlyRate: faker.number.int({
      min: 50000,
      max: 500000,
    }),

    currency: "IDR",

    isAvailable: faker.datatype.boolean(),
  };
}