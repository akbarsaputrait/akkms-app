export const violations = [
  {
    name: "Pembinaan (oleh BP, Wali Kelas, dan Tim Tatib) serta membuat Surat Pernyataan",
    min_score: 15,
    max_score: 25,
    action: "Teguran Lisan",
    level: "minor",
  },
  {
    name: "Pembinaan (oleh BP, Wali Kelas, dan Tim Tatib), Peringatan Tertulis ke-1, Pemanggilan Orang Tua ke-1, Membuat surat pernyataan",
    min_score: 26,
    max_score: 50,
    action: "Teguran Tertulis I",
    level: "distruptive",
  },
  {
    name: "Pembinaan (oleh BP, Wali Kelas, dan Tim Tatib), Peringatan Tertulis ke-2, Pemanggilan Orang Tua ke-2, Skorsing 2 hari (Siswa tidak diizinkan mengikuti pelajaran tetapi diwajibkan mengerjakan tugas mandiri), Membuat surat pernyataan",
    min_score: 51,
    max_score: 75,
    action: "Sanksi II",
    level: "moderate",
  },
  {
    name: "Peringatan Tertulis ke-3, Pemanggilan Orang Tua ke-3, Skorsing 3 hari (Siswa tidak diizinkan mengikuti pelajaran tetapi diwajibkan mengerjakan tugas mandiri), Membuat surat pernyataan/perjanjian",
    min_score: 76,
    max_score: 99,
    action: "Sanksi III",
    level: "serious",
  },
  {
    name: "Siswa dikembalikan kepada orangtua/wali",
    min_score: 100,
    max_score: 100,
    action: "Sanksi IV",
    level: "major",
  },
];
