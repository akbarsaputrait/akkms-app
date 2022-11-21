import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const classes = await prisma.class.findMany({
        select: {
          id: true,
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
          createdAt: true,
          updatedAt: true,
        },
      });
      res.json(classes);
    }
  }
};
