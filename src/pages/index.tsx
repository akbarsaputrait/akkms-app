import { NextPage } from "next";
import Head from "next/head";

import CardExample from "../components/card";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="relative">
      <svg className={styles.wavy} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fillOpacity="1"
          d="M0,320L80,272C160,224,320,128,480,106.7C640,85,800,139,960,165.3C1120,192,1280,192,1360,192L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>

      <svg className={styles.blob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50.7,-52.8C59.2,-42.2,55.1,-21.1,56.2,1.1C57.3,23.3,63.5,46.5,55,59.9C46.5,73.3,23.3,76.9,4.1,72.7C-15,68.6,-29.9,56.7,-43.3,43.3C-56.7,29.9,-68.5,15,-70.4,-1.9C-72.3,-18.7,-64.3,-37.5,-50.9,-48.1C-37.5,-58.7,-18.7,-61.1,1.2,-62.2C21.1,-63.4,42.2,-63.3,50.7,-52.8Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className={styles.homeContainer}>
        <Head>
          <title>AKKMS App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className={styles.main}>
          <CardExample />
        </main>
      </div>
    </div>
  );
};

export default Home;
