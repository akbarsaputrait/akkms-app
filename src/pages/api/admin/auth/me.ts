import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { encrypt } from "../../../../services/hash";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { query } = req;
      const { id } = query;

      const data = (await prisma.admin.findFirstOrThrow({
        where: {
          id: {
            equals: id.toString(),
          },
        },
        select: {
          id: true,
          name: true,
        },
      })) as any;

      res.json({ data, message: "Admin ditemukan" });
      break;
    }
    case "PUT": {
      const { body } = req;
      const { admin: adminId, oldPassword, newPassword } = body;

      const isExist = await prisma.admin.findFirst({
        where: {
          AND: {
            id: {
              equals: adminId.toString(),
            },
            password: {
              equals: encrypt(oldPassword.toString()),
            },
          },
        },
      });

      if (!isExist) {
        res.status(401).json({ message: "Password lama anda mungkin salah" });
        return;
      }

      const data = await prisma.admin.update({
        where: {
          id: isExist.id,
        },
        data: {
          password: newPassword.toString(),
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (data) {
        res.json({ data, message: "Password berhasil diubah" });
      }

      break;
    }
  }
};
