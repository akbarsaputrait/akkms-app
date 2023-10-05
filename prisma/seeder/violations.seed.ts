import { PrismaClient } from "@prisma/client";

import { violations } from "../dummy/violations";

const prisma = new PrismaClient();

export async function seedViolation() {
  await prisma.violation.createMany({
    data: violations,
  });
  console.log("Violation successfully added");
}
