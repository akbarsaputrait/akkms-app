import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const data = await prisma.reward.findMany();
      return res.json({ data });
    }
    case "POST": {
      const { body } = req;
      const { user, reward } = body;

      const checkUser = await prisma.user.findFirstOrThrow({
        select: {
          id: true,
          scores: true,
        },
        where: {
          id: {
            equals: user,
          },
        },
      });

      const checkReward = await prisma.reward.findFirstOrThrow({
        select: {
          score: true,
        },
        where: {
          id: {
            equals: reward,
          },
        },
      });

      const newScore = checkUser.scores - checkReward.score;
      console.log(newScore, checkUser, checkReward);
      const data = await prisma.userCodeOfConduct.create({
        data: {
          userId: checkUser.id,
          rewardId: reward,
          score: newScore,
          type: "POSITIVE",
        },
      });

      await prisma.user.update({
        where: {
          id: checkUser.id,
        },
        data: {
          scores: newScore,
        },
      });

      if (data) {
        return res
          .status(200)
          .json({ data, message: "Bobot pelanggaran berhasil dikurangi oleh reward. Selamat!" });
      }
    }
  }
};
