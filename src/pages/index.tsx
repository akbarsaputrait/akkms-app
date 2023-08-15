import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import LoginForm from "../components/login-form/login-form";
import { StudentInfo } from "../components/student-info/student-info";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (data: any) => {
    if (data) {
      setLogin(true);
      setUser(data);
    }
  };

  const handleLogout = () => {
    setLogin(false), setUser(null);
  };

  return (
    <div className="relative">
      <svg
        id="wave1"
        style={{ transform: "rotate(180deg)", transition: "0.3s" }}
        viewBox="0 0 1440 490"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.wavy}>
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(186, 230, 253, 1)" offset="0%"></stop>
            <stop stopColor="rgba(103.026, 202.83, 255, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style={{ transform: "translate(0, 0px)", opacity: "1" }}
          fill="url(#sw-gradient-0)"
          d="M0,49L40,49C80,49,160,49,240,89.8C320,131,400,212,480,236.8C560,261,640,229,720,179.7C800,131,880,65,960,65.3C1040,65,1120,131,1200,196C1280,261,1360,327,1440,318.5C1520,310,1600,229,1680,228.7C1760,229,1840,310,1920,334.8C2000,359,2080,327,2160,318.5C2240,310,2320,327,2400,302.2C2480,278,2560,212,2640,220.5C2720,229,2800,310,2880,318.5C2960,327,3040,261,3120,269.5C3200,278,3280,359,3360,351.2C3440,343,3520,245,3600,204.2C3680,163,3760,180,3840,196C3920,212,4000,229,4080,212.3C4160,196,4240,147,4320,122.5C4400,98,4480,98,4560,81.7C4640,65,4720,33,4800,32.7C4880,33,4960,65,5040,73.5C5120,82,5200,65,5280,65.3C5360,65,5440,82,5520,138.8C5600,196,5680,294,5720,343L5760,392L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"></path>
      </svg>

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
        <main className={styles.main}>
          {!isLogin ? (
            <>
              <LoginForm callback={(data) => handleLogin(data)} />
            </>
          ) : (
            <>
              <StudentInfo
                data={{
                  ...user,
                  callback: () => handleLogout(),
                }}
              />
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
