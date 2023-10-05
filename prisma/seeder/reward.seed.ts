import { PrismaClient } from "@prisma/client";

import { rewards } from "../dummy/reward";
const prisma = new PrismaClient();

export async function seedReward() {
  await prisma.reward.createMany({
    data: rewards,
  });
  console.log("Reward successfully added");
}
