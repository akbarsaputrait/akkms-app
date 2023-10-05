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
      { name: "A" },
      { name: "B" },
      { name: "C" },
      { name: "D" },
      { name: "E" },
      { name: "F" },
      { name: "G" },
      { name: "H" },
      { name: "I" },
      { name: "IPA 1" },
      { name: "IPA 2" },
      { name: "IPA 3" },
      { name: "IPA 4" },
      { name: "IPA 5" },
      { name: "IPS 1" },
      { name: "IPS 2" },
      { name: "IPS 3" },
      { name: "IPS 4" },
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
      result.push({
        classGradeId: grade.id,
        classTypeId: type.id,
        name: `${grade.name} - ${type.name}`,
      });
    });
  });

  await prisma.class.createMany({ data: result });
  console.log(await prisma.class.findMany());
}

export async function seedClassData() {
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
