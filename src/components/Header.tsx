import Image from "next/image";

import styles from "../styles/Home.module.css";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Image
          src="/images/logo.png"
          alt="Logo SMAN 1 NGRAMBE"
          className={styles.logo}
          width={300}
          height={297}
        />
        <h1 className={styles.title}>JEMPARING</h1>
        <h2 className={styles.desc}>Bidik Karakter SMAN 1 Ngrambe</h2>
        <h4 className={styles.desc2}>
          Kepala Sekolah <br /> <b>Dr. Tjahjono Widijanto, M.Pd.</b>
        </h4>
      </header>
    </>
  );
};
