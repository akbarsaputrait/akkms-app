import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      const { body } = req;
      const { nis, pin } = body;

      const data = (await prisma.user.findFirst({
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
        where: {
          AND: {
            nis: {
              equals: nis.toString(),
            },
            pin: {
              equals: pin.toString(),
            },
          },
        },
      })) as any;

      if (data) {
        data.class = `${data.UserClass[0].class.grade.name} ${data.UserClass[0].class.type.name}`;
        res.json({ data, message: "Siswa ditemukan" });
      } else {
        res.status(404).json({ message: "Siswa tidak ditemukan" });
      }
    }
  }
};
