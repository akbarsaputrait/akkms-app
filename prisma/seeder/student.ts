import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reverse_a_number = (n) => {
  n = n + "";
  return n.split("").reverse().join("");
};

export async function seedUser() {
  const className = await prisma.class.findFirstOrThrow({
    where: {
      name: {
        equals: "XII - IPS 4",
      },
    },
  });

  const data = [
    {
      nis: "0058168656",
      name: "Amanah Setianingrum",
      gender: "L",
    },
    {
      nis: "0068908834",
      name: "ANDIKA CAHYO SAPUTRO",
      gender: "L",
    },
    {
      nis: "0068543930",
      name: "ANDIKA DILAR PERMANA",
      gender: "L",
    },
    {
      nis: "0068910964",
      name: "ARYA PERMANA",
      gender: "L",
    },
    {
      nis: "0054854614",
      name: "ARYANTIKA IRFANY PUTRI",
      gender: "L",
    },
    {
      nis: "0066354278",
      name: "CANDRA MARDHIAN ANTORI",
      gender: "L",
    },
    {
      nis: "0062744244",
      name: "Chelsy Nameisya Karina",
      gender: "L",
    },
    {
      nis: "0068908302",
      name: "Desprido Sony Kuncoro",
      gender: "L",
    },
    {
      nis: "0061753547",
      name: "Dian Meileni Olivia",
      gender: "L",
    },
    {
      nis: "0056380106",
      name: "ERIK YOGA PRATAMA",
      gender: "L",
    },
    {
      nis: "0055612794",
      name: "ESTI CAHYA NINGRUM",
      gender: "L",
    },
    {
      nis: "0069406511",
      name: "Gilang Puji Kusdiantoro",
      gender: "L",
    },
    {
      nis: "0059113304",
      name: "HENDRIK HERMAWAN",
      gender: "L",
    },
    {
      nis: "0067661237",
      name: "Intan Ratna Sari",
      gender: "L",
    },
    {
      nis: "0052012950",
      name: "Khoirul hidayat",
      gender: "L",
    },
    {
      nis: "0056476004",
      name: "LATTIFA ADHELIA",
      gender: "L",
    },
    {
      nis: "0064188084",
      name: "Mezita Epricillia Saputri",
      gender: "L",
    },
    {
      nis: "0059778759",
      name: "NATSYA ARYA PUTRI MELATI",
      gender: "L",
    },
    {
      nis: "0066000780",
      name: "NAYA MIFTACHUL JANAH",
      gender: "L",
    },
    {
      nis: "0052734204",
      name: "NICO FEBRIANTO",
      gender: "L",
    },
    {
      nis: "0064851260",
      name: "NOVITATRI ASTUTIK",
      gender: "L",
    },
    {
      nis: "0052455435",
      name: "Puput Alfi Fauziah",
      gender: "L",
    },
    {
      nis: "0066080123",
      name: "RENITA DWIYANTI",
      gender: "L",
    },
    {
      nis: "0054659755",
      name: "REYHAN RIFQI MUHAMMAD IQBAL",
      gender: "L",
    },
    {
      nis: "0063628758",
      name: "RIFA HASNA NAILAH",
      gender: "L",
    },
    {
      nis: "0068094635",
      name: "RITA MAULIDIA",
      gender: "L",
    },
    {
      nis: "0043007581",
      name: "RIYANTO",
      gender: "L",
    },
    {
      nis: "0063755651",
      name: "SINTA DUWI ANGGRAINI",
      gender: "L",
    },
    {
      nis: "0066486211",
      name: "TIAS RATNA PUTRI",
      gender: "L",
    },
    {
      nis: "0064325471",
      name: "Wildan Nur Afriansyah",
      gender: "L",
    },
  ];
  const process = async () => {
    for (const { nis, name, gender } of data) {
      const createUser = await prisma.user.create({
        data: {
          nis,
          name: name.toUpperCase(),
          gender,
          pin: reverse_a_number(nis),
        },
      });
      const createClass = await prisma.userClass.create({
        data: {
          userId: createUser.id,
          educationYear: "2023/2024",
          classId: className.id,
          name: className.name,
        },
      });

      console.log(`${createUser.name} (${createClass.name}) completed`);
    }
  };

  process().catch((error) => console.log(error));
}

export async function seedStudent() {
  seedUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
