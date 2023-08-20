import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { query } = req;
      const { type } = query;

      if (!type) {
        const data = await prisma.codeOfConductType.findMany({
          select: {
            id: true,
            name: true,
          },
        });

        return res.status(200).json({ data, message: "Jenis Pelanggaran berhasil didapatkan" });
      } else {
        const data = (
          await prisma.codeOfConduct.findMany({
            where: {
              codeOfConductTypeId: {
                equals: type.toString(),
              },
            },
            select: {
              id: true,
              name: {
                select: {
                  name: true,
                },
              },
            },
          })
        ).map((item) => {
          return { id: item.id, conduct: item.name };
        });

        return res.status(200).json({ data, message: "Jenis Pelanggaran berhasil didapatkan" });
      }
    }

    case "POST": {
      const { body } = req;
      const { user, conduct } = body;

      const checkUser = await prisma.user.findFirstOrThrow({
        select: {
          scores: true,
        },
        where: {
          id: {
            equals: user,
          },
        },
      });

      const checkCond = await prisma.codeOfConduct.findFirstOrThrow({
        select: {
          name: {
            select: {
              score: true,
            },
          },
        },
        where: {
          id: {
            equals: conduct,
          },
        },
      });

      const scores = Number(checkUser.scores) + Number(checkCond.name.score);

      const data = await prisma.userCodeOfConduct.create({
        data: {
          userId: user,
          codeOfConductId: conduct,
          score: checkCond.name.score,
          type: "NEGATIVE",
          status: "APPROVED",
        },
      });

      await prisma.user.update({
        where: {
          id: user,
        },
        data: {
          scores,
        },
      });

      if (data) {
        return res.status(200).json({ data, message: "Bobot pelanggaran berhasil ditambahkan" });
      }
    }
  }
};
