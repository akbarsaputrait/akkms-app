import { NextPage } from "next";
import Head from "next/head";

import { ClassList } from "../components/classList";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>AKKMS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <img src="/images/logo.jpeg" alt="Logo SMA Negeri 1 Ngawi" className={styles.logo} />
        <h1 className={styles.title}>AKKMS App</h1>
        <h2 className={styles.desc}>
          APLIKASI KEJUJURAN DAN KEDISIPLINAN MANDIRI SISWA <br />
          <a href="https://sman1ngawi.sch.id/" target="_blank" rel="noreferrer">
            SMA Negeri 1 Ngawi
          </a>
        </h2>
      </header>

      <main className={styles.main}>
        <ClassList />
      </main>
    </div>
  );
};

export default Home;
