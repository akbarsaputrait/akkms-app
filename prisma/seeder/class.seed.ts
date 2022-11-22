import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedClass() {
  // Class Grade
  await prisma.classGrade.createMany({
    data: [{ name: "X" }, { name: "XI" }, { name: "XII" }],
  });
  console.log("ClassGrade successfully added");

  // Class Type
  await prisma.classType.createMany({
    data: [
      { name: "MIPA 1" },
      { name: "MIPA 2" },
      { name: "MIPA 3" },
      { name: "MIPA 4" },
      { name: "MIPA 5" },
      { name: "MIPA 6" },
      { name: "MIPA 7" },
      { name: "MIPA 8" },
      { name: "IPS 1" },
      { name: "IPS 2" },
      { name: "IPS 3" },
    ],
  });
  console.log("ClassType successfully added");
}

// Seed Main Class Data
async function seedMainClass() {
  const classType = await prisma.classType.findMany();
  const classGrade = await prisma.classGrade.findMany();
  const result = [];

  classType.forEach((type) => {
    classGrade.forEach((grade) => {
      result.push({ classGradeId: grade.id, classTypeId: type.id });
    });
  });

  await prisma.class.createMany({ data: result });
  console.log(await prisma.class.findMany());
}

export function seedClassData() {
  seedClass()
    .then(async () => {
      await seedMainClass();
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
