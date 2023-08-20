import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedAdmin() {
  await prisma.admin.deleteMany();
  return await prisma.admin.create({
    data: {
      name: "Admin",
      username: "admin",
      password: "Satudua3!",
    },
  });
}
