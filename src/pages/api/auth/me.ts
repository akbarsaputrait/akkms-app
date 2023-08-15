import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { query } = req;
      const { id } = query;

      const data = (await prisma.user.findFirstOrThrow({
        where: {
          id: {
            equals: id.toString(),
          },
        },
        select: {
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
        },
      })) as any;

      if (data) {
        data.class = `${data.UserClass[0].class.grade.name} ${data.UserClass[0].class.type.name}`;

        const violationLevel = await prisma.violation.findFirstOrThrow({
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
      }
      break;
    }
    case "PUT": {
      const { body } = req;
      const { user, oldPin, newPin } = body;

      const isExist = await prisma.user.findFirst({
        where: {
          AND: {
            id: {
              equals: user.toString(),
            },
            pin: {
              equals: oldPin.toString(),
            },
          },
        },
      });

      if (!isExist) {
        res.status(401).json({ message: "PIN lama anda mungkin salah" });
        return;
      }

      const data = await prisma.user.update({
        where: {
          id: isExist.id,
        },
        data: {
          pin: newPin.toString(),
        },
        select: {
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
        },
      });

      if (data) {
        res.json({ data, message: "PIN berhasil diubah" });
      }
    }
  }
};
