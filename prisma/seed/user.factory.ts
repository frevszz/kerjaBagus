import { faker } from "@faker-js/faker";

export function generateUser() {
  return {
    email: faker.internet.email().toLowerCase(),

    // nanti bisa diganti bcrypt hash
    passwordHash: "password123",

    isClient: faker.datatype.boolean(),
    isFreelancer: faker.datatype.boolean(),
    isAdmin: false,
  };
}