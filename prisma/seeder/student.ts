import { PrismaClient } from "@prisma/client";

import { studentB } from "../dummy/studentB";

const prisma = new PrismaClient();

const reverse_a_number = (n) => {
  n = n + "";
  return n.split("").reverse().join("");
};

export async function seedUser() {
  const className = await prisma.class.findFirstOrThrow({
    where: { id: "cf317e91-6585-4b31-8ad7-7d48ebda7f7e" },
  });

  const process = async () => {
    for (const { nis, name, gender } of studentB) {
      const createUser = await prisma.user.create({
        data: {
          nis,
          name: name.toUpperCase(),
          gender,
          pin: reverse_a_number(nis),
        },
      });
      const createClass = await prisma.userClass.create({
        data: {
          userId: createUser.id,
          educationYear: "2023/2024",
          classId: className.id,
          name: className.name,
        },
      });

      console.log(`${createUser.name} (${createClass.name}) completed`);
    }
  };

  await process();
}

export function seedStudent() {
  seedUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
