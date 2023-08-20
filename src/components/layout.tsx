import Head from "next/head";

import styles from "../styles/Home.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="relative">
        <div className={styles.homeContainer}>
          <Head>
            <title>JEMPARING APP - SMAN 1 NGRAMBE</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="apple-mobile-web-app-title" content="JEMPARING APP" />
            <meta name="application-name" content="JEMPARING APP" />
            <meta name="msapplication-TileColor" content="#2b5797" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
