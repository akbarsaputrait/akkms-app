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
        res.json({ data, message: "Siswa ditemukan" });
      }
    }
  }
};
