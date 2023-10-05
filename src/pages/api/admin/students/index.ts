import { PrismaClient } from "@prisma/client";
import { get } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
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

      const where = {};

      if (get(req, "query.nis", null)) {
        Object.assign(where, {
          nis: {
            equals: req.query.nis,
          },
        });
      }

      const data = (await prisma.user.findMany({
        select,
        where,
        orderBy: {
          name: "asc",
        },
        take: 30,
      })) as any;

      if (data) {
        const results = [];

        for (const student of data) {
          student.class = `${student.UserClass[0].class.grade.name} ${student.UserClass[0].class.type.name}`;

          const violationLevel = await prisma.violation.findFirst({
            where: {
              AND: {
                min_score: {
                  lte: Number(student.scores),
                },
                max_score: {
                  gte: Number(student.scores),
                },
              },
            },
          });

          student.violation = violationLevel || null;

          results.push({
            id: student.id,
            nis: student.nis,
            name: student.name,
            scores: student.scores,
            class: student.class,
            violation: student.violation?.level || null,
          });
        }
        res.json({ data: results, message: "Siswa ditemukan" });
      } else {
        res.status(404).json({ message: "Siswa tidak ditemukan" });
      }
    }
  }
};
