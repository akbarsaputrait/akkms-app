import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedAdmin() {
  await prisma.admin.deleteMany();
  await prisma.admin.create({
    data: {
      name: "Admin",
      username: "admin",
      password: "Satudua3!",
    },
  });
  console.log("Admin successfully added");
}
