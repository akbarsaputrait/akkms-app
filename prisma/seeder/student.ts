import { PrismaClient } from "@prisma/client";

import { studentA } from "../dummy/studentA";
import { studentB } from "../dummy/studentB";
import { studentC } from "../dummy/studentC";
import { studentD } from "../dummy/studentD";
import { studentE } from "../dummy/studentE";
import { studentF } from "../dummy/studentF";
import { studentG } from "../dummy/studentG";
import { studentH } from "../dummy/studentH";
const prisma = new PrismaClient();

const reverse_a_number = (n) => {
  n = n + "";
  return n.split("").reverse().join("");
};

export async function seedUser() {
  for (const { nis, name, gender } of studentA) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "dd137e05-9405-4b53-9d6c-8f579addb7c0",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentB) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "780d9a7c-44af-44f1-adc6-f2f34c347f8e",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentC) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "81b3fef6-fc0a-4dd9-a263-fb65ea043daf",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentD) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "2504af03-5dad-4c9c-adf5-81f1b44df668",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentE) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "be57f2fc-5360-4498-8ed5-0f0b4c5ce678",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentF) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "b74f67cb-bed4-49e6-ac04-433721415c62",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentG) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "3bd6f4b3-ae37-4b3b-af70-aaa1b43a7344",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }

  for (const { nis, name, gender } of studentH) {
    prisma.user
      .create({
        data: {
          nis,
          name,
          gender,
          pin: reverse_a_number(nis),
        },
      })
      .then((user) => {
        return prisma.userClass.create({
          data: {
            userId: user.id,
            educationYear: "2022/2023",
            classId: "16fd82d9-af65-4e3a-a60a-b3d040dff1ca",
          },
        });
      })
      .then((data) => console.log(`${data.id} completed`));
  }
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
