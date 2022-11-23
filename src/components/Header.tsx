import Image from "next/image";

import styles from "../styles/Home.module.css";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Image
          src="/images/logo.png"
          alt="Logo SMA Negeri 1 Ngawi"
          className={styles.logo}
          width={300}
          height={297}
        />
        <h1 className={styles.title}>SMAN 1 NGAWI</h1>
        <h2 className={styles.desc}>APLIKASI KEJUJURAN DAN KEDISIPLINAN MANDIRI SISWA</h2>
      </header>
    </>
  );
};
