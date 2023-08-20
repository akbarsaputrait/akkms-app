import { NextPage } from "next";
import { useState } from "react";

import Layout from "../components/layout";
import LoginForm from "../components/login-form/login-form";
import { StudentInfo } from "../components/student-info/student-info";

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
    <Layout>
      {!isLogin ? (
        <LoginForm callback={handleLogin} />
      ) : (
        <StudentInfo data={user} isAdmin={false} callback={handleLogout} />
      )}
    </Layout>
  );
};

export default Home;
