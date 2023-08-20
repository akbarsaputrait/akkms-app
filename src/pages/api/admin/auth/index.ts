import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      const { body } = req;
      const { username, password } = body;

      const data = (await prisma.admin.findFirst({
        select: {
          id: true,
          name: true,
        },
        where: {
          AND: {
            username: {
              equals: username.toString(),
            },
            password: {
              equals: password.toString(),
            },
          },
        },
      })) as any;

      if (data) {
        res.json({ data, message: "Admin ditemukan" });
      } else {
        res.status(404).json({ message: "Admin tidak ditemukan" });
      }
    }
  }
};
