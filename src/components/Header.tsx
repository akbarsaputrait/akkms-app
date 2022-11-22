import Image from "next/image";

import styles from "../styles/Home.module.css";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Image src="/images/logo.png" alt="Logo SMA Negeri 1 Ngawi" className={styles.logo} />
        <h1 className={styles.title}>AKKMS App</h1>
        <h2 className={styles.desc}>
          APLIKASI KEJUJURAN DAN KEDISIPLINAN MANDIRI SISWA <br />
          <a href="https://sman1ngawi.sch.id/" target="_blank" rel="noreferrer">
            SMA Negeri 1 Ngawi
          </a>
        </h2>
      </header>
    </>
  );
};
