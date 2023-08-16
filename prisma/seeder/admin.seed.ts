import { PrismaClient } from "@prisma/client";

import { encrypt } from "../../src/services/hash";
const prisma = new PrismaClient();

export async function seedAdmin() {
  await prisma.admin.deleteMany();
  return await prisma.admin.create({
    data: {
      name: "Admin",
      username: "admin",
      password: encrypt("Satudua3!"),
    },
  });
}
