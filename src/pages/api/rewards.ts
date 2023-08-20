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

      const data = await prisma.userCodeOfConduct.create({
        data: {
          userId: checkUser.id,
          rewardId: reward,
          score: 0,
          type: "POSITIVE",
          status: "PENDING",
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
