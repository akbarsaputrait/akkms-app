import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const dataA = [
  {
    name: "Datang jam 07.01 s.d 07.15",
    penalty: "Tugas kebersihan 1 jam pelajaran",
    score: 5,
  },
  {
    name: "Datang > jam 7.15",
    penalty: "Tugas kebersihan 1 jam pelajaran",
    score: 10,
  },
  {
    name: "Tidak masuk tanpa keterangan",
    penalty: "Panggilan BK",
    score: 15,
  },
  {
    name: "Memalsukan tanda tangan ortu/wali",
    penalty: "Panggilan Ortu ",
    score: 20,
  },
  {
    name: "Tidak hadir pada kegiatan ekstra wajib/BBI dan ekstrakurikuler yang diikuti, tanpa keterangan",
    penalty: "Merangkum Kegiatan hari itu",
    score: 5,
  },
  {
    name: "Tidak mengikuti upacara tanpa keterangan",
    penalty: "Upacara Sendiri",
    score: 10,
  },
];

const dataB = [
  {
    name: "Berada diluar kelas (Kantin, Lapangan Olahraga Dll) saat KBM berlangsung",
    penalty: "Tugas Kebersihan",
    score: 10,
  },
  {
    name: "Membuat kegaduhan / Aktifitas yang mengganggu kelas lain",
    penalty: "Tugas Kebersihan",
    score: 5,
  },
  {
    name: "Keluar kelas/lingkungan sekolah tanpa ijin pada jam pelajaran",
    penalty: "Tugas Kebersihan",
    score: 10,
  },
  {
    name: "Masuk ke kelas lain tanpa ijin",
    penalty: "Tugas Kebersihan",
    score: 10,
  },
];

const dataC = [
  { name: "Atribut tidak lengkap", penalty: "Membeli di Kopsis dan Dipasang", score: 5 },
  {
    name: "Warna pakaian tidak sesuai tanpa alasan yang dibenarkan (seragam olahraga, seragam lab praktikum, batik sekolah)",
    penalty: "Dipulangkan untuk berganti pakaian sesuai aturan",
    score: 5,
  },
  {
    name: "Sepatu / Kaos kaki / Ikat pinggang tidak sesuai",
    penalty: "Disita, untuk dibakar",
    score: 5,
  },
  {
    name: "Pakaian ketat / Celana Pensil",
    penalty: "Dipotong sendiri dan diperbaiki sesuai dengan ketentuan yang berlaku",
    score: 10,
  },
  {
    name: "Seragam model tidak sesuai ketentuan",
    penalty: "Dibetulkan/ disesuaikan dengan ketentuan",
    score: 10,
  },
  {
    name: "Siswa Putra gondrong / semir / Bergaris",
    penalty: "Dipotong sesuai ketentuan",
    score: 5,
  },
  {
    name: "Berlipstik / berdandan menor",
    penalty: "Mencuci muka",
    score: 5,
  },
  {
    name: "Acsesories berlebihan (bros besar, hiasan, rambut, gelang, Dll)",
    penalty: "Disita pihak sekolah",
    score: 5,
  },
  {
    name: "Memanjangkan kuku dan/atau mengecat kuku, dan menindik",
    penalty: "Dipotong sesuai ketentuan",
    score: 5,
  },
  {
    name: "Memakai atribut / aksesoris yang tidak sesuai dan berlebihan dari luar sekolah",
    penalty: "Disita pihak sekolah",
    score: 5,
  },
];

const dataD = [
  {
    name: "Tidak Sholat Dhuhur",
    penalty: "Sholat dan merapikan peralatan sholat",
    score: 5,
  },
  {
    name: "Tidak Sholat Jumat di Sekolah",
    penalty: "Mengumpulkan satu buku keagamaan ke perpustakaan",
    score: 10,
  },
  {
    name: "Berbicara tidak sopan / tidak menghargai teman / guru / karyawan",
    penalty: "Minta maaf dan berjanji tidak mengulangi lagi",
    score: 10,
  },
  {
    name: "Menyontek, mengambil jawaban/pekerjaan siswa lain, dll",
    penalty: "Mengerjakan ulang",
    score: 10,
  },
  {
    name: "Menyampaikan ancaman dalam bentuk kata - kata / perbuatan kepada teman / guru / karyawan",
    penalty: "Minta maaf dan membuat surat pernyataan tidak mengulangi lagi",
    score: 25,
  },
  {
    name: "Merusak / Menyebabkan Kerusakan fasilitas sekolah",
    penalty: "Mengganti dan/atau memperbaiki",
    score: 25,
  },
  {
    name: "Berpacaran / bergaul terlalu bebas dengan lawan jenis ( Misalnya merangkul, mencium, meraba, bergandengan)",
    penalty: "Merangkum buku : PKRR / Etika pergaulan / Agama",
    score: 25,
  },
  {
    name: "Membawa dan/atau mengaktifkan HP saat Kegiatan Belajar Mengajar",
    penalty: "Disita, bisa diambil orangtua di akhir semester",
    score: 20,
  },
  {
    name: "Membawa senjata dan/atau gambar porno, video porno",
    penalty: "Disita, panggilan orangtua",
    score: 50,
  },
  {
    name: "Merokok di sekolah dan/atau merokok saat menggunakan seragam sekolah",
    penalty: "Panggilan orangtua",
    score: 25,
  },
  {
    name: "Mencoret-coret fasilitas sekolah",
    penalty: "Menghapus bersih",
    score: 15,
  },
  {
    name: "Mengambil dan/atau merusak pengumuman sekolah",
    penalty: "Mengembalikan ketempat semula",
    score: 15,
  },
  {
    name: "Menerima tamu/orang luar tanpa ijin",
    penalty: "Bersama tamu dipanggil",
    score: 20,
  },
  {
    name: "Berkelahi",
    penalty: "Panggilan orangtua dan skors",
    score: 50,
  },
  {
    name: "Minum minuman keras",
    penalty: "Panggilan orangtua dan skors",
    score: 50,
  },
  {
    name: "Ada laporan dan terbukti terlibat tindak kriminalitas",
    penalty: "Panggilan orangtua dan membuat pernyataan",
    score: 50,
  },
  {
    name: "Berzina / hamil / dilaporkan terbukti menghamili",
    penalty: "Dikembalikan kepada orangtua",
    score: 100,
  },
];

const dataE = [
  {
    name: "Kendaraan tidak lengkap sesuai peraturan lalu lintas",
    penalty: "Melengkapi sesuai aturan",
    score: 5,
  },
  {
    name: "Memarkir sepeda motor sembarangan",
    penalty: "Mengambil dan memindahkan ke parkir sekolah",
    score: 5,
  },
  {
    name: "Mengendarai dengan kecepatan tinggi / mengeraskan suara knalpot dan mengganggu di lingkungan Sekolah",
    penalty: "Membuat surat pernyataan dan mengembalikan seperti semula",
    score: 10,
  },
];

export async function seedConduct() {
  console.log("Seed ConductType is in progress...");
  // Conde of Conduct Type
  const typeA = await prisma.codeOfConductType.create({
    data: { name: "Kehadiran di Kelas/Sekolah" },
  });
  await seedConductName(dataA, typeA.id);
  console.log("Code of conduct A is finished");

  const typeB = await prisma.codeOfConductType.create({
    data: { name: "Ketenangan dan Ketertiban Kelas" },
  });
  await seedConductName(dataB, typeB.id);
  console.log("Code of conduct B is finished");

  const typeC = await prisma.codeOfConductType.create({
    data: { name: "Pakaian dan Kerapihan" },
  });
  await seedConductName(dataC, typeC.id);
  console.log("Code of conduct C is finished");

  const typeD = await prisma.codeOfConductType.create({
    data: { name: "Sikap / Perilaku" },
  });
  await seedConductName(dataD, typeD.id);
  console.log("Code of conduct D is finished");

  const typeE = await prisma.codeOfConductType.create({
    data: { name: "Berkendaraan" },
  });
  await seedConductName(dataE, typeE.id);
  console.log("Code of conduct D is finished");

  console.log("Seed ConductType is in Finished...");
}

async function seedConductName(data: any[], type: string) {
  data
    .map((item) => {
      // Convert score to Number
      return { ...item, score: Number(item.score) };
    })
    .forEach(async (item) => {
      const name = await prisma.codeOfConductName.create({
        data: item,
      });

      await prisma.codeOfConduct.create({
        data: {
          codeOfConductTypeId: type,
          codeOfConductNameId: name.id,
        },
      });
    });
}

export async function seedConductData() {
  seedConduct()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
