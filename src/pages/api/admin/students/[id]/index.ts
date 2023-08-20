import { PrismaClient } from "@prisma/client";
import { has } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { query } = req;
      const select = {
        id: true,
        name: true,
        nis: true,
        gender: true,
        scores: true,
        UserClass: {
          select: {
            class: {
              select: {
                grade: {
                  select: {
                    name: true,
                  },
                },
                type: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      };

      if (has(query, "id")) {
        const data = (await prisma.user.findFirst({
          select,
          where: {
            id: query.id.toString(),
          },
        })) as any;

        if (data) {
          data.class = `${data.UserClass[0].class.grade.name} ${data.UserClass[0].class.type.name}`;

          const violationLevel = await prisma.violation.findFirst({
            where: {
              AND: {
                min_score: {
                  lte: Number(data.scores),
                },
                max_score: {
                  gte: Number(data.scores),
                },
              },
            },
          });

          data.violation = violationLevel || null;

          res.json({ data, message: "Siswa ditemukan" });
        } else {
          res.status(404).json({ message: "Siswa tidak ditemukan" });
        }
      }
    }
  }
};
