import { faker } from "@faker-js/faker";

export function generateAddress() {
  return {
    country: "Indonesia",
    province: faker.location.state(),
    city: faker.location.city(),
    district: faker.location.county(),
    village: faker.location.street(),
    postalCode: faker.location.zipCode(),

    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
  };
}