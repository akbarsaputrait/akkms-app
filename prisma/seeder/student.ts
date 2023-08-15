import { PrismaClient } from "@prisma/client";

import { studentA } from "../dummy/studentA";

const prisma = new PrismaClient();

const reverse_a_number = (n) => {
  n = n + "";
  return n.split("").reverse().join("");
};

export async function seedUser() {
  const className = await prisma.class.findFirstOrThrow({
    where: { id: "8490fe67-d547-480e-9193-a96d93545f36" },
  });

  const process = async () => {
    for (const { nis, name, gender } of studentA) {
      const createUser = await prisma.user.create({
        data: {
          nis,
          name,
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
