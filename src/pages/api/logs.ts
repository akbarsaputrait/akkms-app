import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { query } = req;
      const { user } = query;

      const data = await (
        await prisma.userCodeOfConduct.findMany({
          where: {
            userId: {
              equals: user.toString(),
            },
          },
          select: {
            id: true,
            createdAt: true,
            type: true,
            codeOfConduct: {
              select: {
                type: {
                  select: {
                    name: true,
                  },
                },
                name: {
                  select: {
                    name: true,
                    score: true,
                  },
                },
              },
            },
          },
        })
      ).map((item) => {
        return {
          id: item.id,
          createdAt: item.createdAt,
          type: item.type,
          conduct_type: item.codeOfConduct.type.name,
          name: item.codeOfConduct.name.name,
          score: item.codeOfConduct.name.score,
        };
      });

      return res.status(200).json({ data, message: "Berhasil mendapatkan logs" });
    }
  }
};
