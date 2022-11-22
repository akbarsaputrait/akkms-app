import { PrismaClient } from "@prisma/client";
import { type } from "os";
const prisma = new PrismaClient();

export async function seedConductType() {
  // Conde of Conduct Type
  await prisma.codeOfConductType.createMany({
    data: [
      { name: "Kehadiran di Kelas/Sekolah" },
      { name: "Ketenangan dan Ketertiban Kelas" },
      { name: "Pakaian dan Kerapihan" },
      { name: "Sikap / Perilaku" },
    ],
  });
  console.log("ConductType successfully added");
}

export async function seedConductName() {
  // Code of conduct name
  const data = [
    {
      name: "Datang jam 07.01 s.d 07.15",
      penalty: "Tugas kebersihan 1 jam pelajaran (setelah 5x pelanggaran)",
      score: "5",
    },
    {
      name: "Datang > jam 7.15",
      penalty: "Tugas kebersihan 1 jam pelajaran",
      score: "10",
    },
    {
      name: "Tidak masuk tanpa keterangan",
      penalty: "Merangkum pelajaran hari itu",
      score: "15",
    },
    {
      name: "Memalsukan tanda tangan ortu/wali",
      penalty: "Panggilan Ortu ",
      score: "20",
    },
    {
      name: "Tidak hadir pada kegiatan ekstra wajib/BBI dan ekstrakurikuler yang diikuti, tanpa keterangan",
      penalty: "Merangkum Kegiatan hari itu",
      score: "5",
    },
    {
      name: "Tidak mengikuti upacara tanpa keterangan",
      penalty: "Upacara Sendiri",
      score: "10",
    },
    {
      name: "Berada diluar kelas (Kantin, Lapangan Olahraga Dll) saat KBM berlangsung",
      penalty: "Tugas Kebersihan",
      score: "10",
    },
    {
      name: "Membuat kegaduhan / Aktifitas yang mengganggu kelas lain",
      penalty: "Tugas Kebersihan",
      score: "5",
    },
    {
      name: "Keluar kelas/lingkungan sekolah tanpa ijin pada jam pelajaran",
      penalty: "Tugas Kebersihan",
      score: "10",
    },
    {
      name: "Masuk ke kelas lain tanpa ijin",
      penalty: "Tugas Kebersihan",
      score: "10",
    },
    { name: "Atribut tidak lengkap", penalty: "Membeli di Kopsis", score: "5" },
    {
      name: "Warna pakaian tidak sesuai tanpa alasan yang dibenarkan ",
      penalty: "",
      score: "2",
    },
    {
      name: "Sepatu / Kaos kaki / Ikat pinggang tidak sesuai",
      penalty: "Disita (setelah 3x pelanggaran)",
      score: "5",
    },
    {
      name: "Pakaian ketat ",
      penalty:
        "Dipotong sendiri dan diperbaiki sesuai dengan ketentuan yang berlaku",
      score: "10",
    },
    { name: "Siswa Putra gondrong / semir", penalty: "Dicukur", score: "10" },
    { name: "Makeup yang berlebihan", penalty: "Mencuci muka", score: "5" },
    {
      name: "Acsesories berlebihan (bros besar, perhiasan,  gelang, Dll)",
      penalty: "",
      score: "5",
    },
    {
      name: "Memanjangkan kuku dan/atau mengecat kuku, dan menindik",
      penalty: "Dipotong / dibersihkan",
      score: "5",
    },
    {
      name: "Berbicara tidak sopan / tidak menghargai teman / guru / karyawan",
      penalty: "Minta maaf dan berjanji tidak mengulangi lagi ",
      score: "10",
    },
    {
      name: "Menyampaikan ancaman dalam bentuk kata - kata / perbuatan kepada teman / guru / karyawan",
      penalty: "Minta maaf dan membuat surat pernyataan tidak mengulangi lagi",
      score: "25",
    },
    {
      name: "Merusak / Menyebabkan Kerusakan fasilitas sekolah",
      penalty: "Mengganti dan/atau memperbaiki",
      score: "10",
    },
    {
      name: "Berpacaran / bergaul terlalu bebas dengan lawan jenis ( Misalnya merangkul, mencium, meraba, bergandengan)",
      penalty: "Merangkum buku : PKRR / Etika pergaulan / Agama",
      score: "25",
    },
    {
      name: "Bermain HP saat KBM berlangsung",
      penalty: "Disita, bisa diambil orangtua",
      score: "20",
    },
    {
      name: "Membawa senjata dan/atau gambar porno, video porno",
      penalty: "Disita, panggilan orangtua",
      score: "50",
    },
    {
      name: "Merokok di sekolah dan/atau merokok saat menggunakan seragam sekolah",
      penalty: "Panggilan Orangtua",
      score: "50",
    },
    {
      name: "Mencorat-coret fasilitas sekolah",
      penalty: "Menghapus bersih",
      score: "15",
    },
    {
      name: "Mengambil dan/atau merusak pengumuman sekolah",
      penalty: "Mengembalikan",
      score: "15",
    },
    { name: "Berkelahi", penalty: "Panggilan orangtua dan skors", score: "50" },
    {
      name: "Menyontek, mengambil jawaban/pekerjaan siswa lain, dll",
      penalty: "Mengerjakan ulang",
      score: "10",
    },
    {
      name: "Minum minuman keras",
      penalty: "Panggilan orangtua dan skors",
      score: "50",
    },
    {
      name: "Ada laporan dan terbukti terlibat tindak kriminalitas",
      penalty: "Panggilan orangtua dan membuat pernyataan",
      score: "100",
    },
    {
      name: "Berzina / hamil / dilaporkan terbukti menghamili",
      penalty: "Dikembalikan kepada orangtua",
      score: "100",
    },
  ].map((item) => {
    return { ...item, score: Number(item.score) };
  });
  await prisma.codeOfConductName.createMany({
    data,
  });
}

async function seedMainConduct() {
  const typeA = [
    "caf2881c-09d4-4c16-95b9-0cac679becad",
    "ed14576d-d791-45e6-9dcb-4d4289516d67",
    "0b63915d-9a71-4c09-8520-2bc2e7ba2e39",
    "d66421c1-3aa9-467d-ab54-92262666d23f",
    "c2b7effc-b650-4bf3-84ca-40c4ee4b5b44",
    "85e5ab1e-7037-4514-9b9a-1ef78204bfc4",
  ];
  const typeB = [
    "e8dc3aab-1623-4a59-89fc-2ec21c50b8db",
    "6d8c793d-5dff-4263-a6b9-a8303fb07475",
    "6fb4ebe6-2ac1-4a53-815b-30e26782fa96",
    "5c06f20c-7be5-4307-a34b-1968c9f90fe1",
  ];
  const typeC = [
    "3af4a63d-fcbf-4e73-b719-111ad6487bb1",
    "95105512-d5a0-45c6-a8f5-95195c6ad911",
    "b675a936-3859-4ad9-9b12-9b056110c7f6",
    "bd62de7c-1f1e-4e7d-b896-add637db3fcc",
    "2e6026ef-565f-431a-af1e-c2e909e5f59c",
    "fc3d18bc-1b77-44b1-8900-7f0c0c671007",
    "cf4ffb0c-d74f-4730-a893-375280ef4568",
    "55034d80-bbd1-4cd7-80a1-c2c680d33cb4",
  ];
  const typeD = [
    "b8353d46-b111-4492-b1e2-337bd3abd262",
    "d05ad14c-1da4-4ce7-b1ef-f9395189854d",
    "c1234cda-c3bd-49b0-9cf6-ed4dfac07001",
    "86ed859e-6aeb-465a-9545-4e64cf338879",
    "e2f053d3-160e-4922-8142-4904aeeb4677",
    "0a396ac5-d939-4047-84b0-b0042ff3dc56",
    "c2afc51c-742b-4d7b-9656-e9e672d63b2d",
    "d98fe40f-36e8-4bcf-88dd-0660c7223662",
    "4ff6dc27-c428-4e05-9737-8a1d29eba00c",
    "d4035658-47c1-47a3-9953-61ddb96565a6",
    "f3637538-a211-4245-9054-e3fcc54dfe9e",
    "b3bc0ff2-3b5f-4289-97df-280300196773",
    "32be8fde-023c-4934-a95d-2a63c63a6cfb",
    "d0fc8749-283e-4eed-87c3-933416ed9dc5",
    "b8353d46-b111-4492-b1e2-337bd3abd86c",
  ];

  const dataA = typeA.map((item) => {
    return {
      codeOfConductTypeId: "d46302e5-e968-4c83-b4e2-93fd604b57fd",
      codeOfConductNameId: item,
    };
  });

  const dataB = typeB.map((item) => {
    return {
      codeOfConductTypeId: "57060028-c035-45a3-a7ff-f077e22a4182",
      codeOfConductNameId: item,
    };
  });

  const dataC = typeC.map((item) => {
    return {
      codeOfConductTypeId: "8c0fc8fa-474a-40d5-b58c-1396a3d95ce3",
      codeOfConductNameId: item,
    };
  });

  const dataD = typeD.map((item) => {
    return {
      codeOfConductTypeId: "596fcf53-9ba0-4da3-b92e-8469611150be",
      codeOfConductNameId: item,
    };
  });

  await prisma.codeOfConduct.createMany({
    data: [...dataA, ...dataB, ...dataC, ...dataD],
  });
}

export function seedConductData() {
  // seedConductType()
  //   .then(async () => {
  //     await seedConductName();
  //     await prisma.$disconnect();
  //   })
  //   .catch(async (e) => {
  //     console.error(e);
  //     await prisma.$disconnect();
  //     process.exit(1);
  //   });

  seedMainConduct()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
