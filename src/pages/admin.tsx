import { NextPage } from "next";
import { useState } from "react";

import AdminLoginForm from "../components/admin/login-form/login-form";
import AdminPage from "../components/admin/page/page";
import Layout from "../components/layout";

const Admin: NextPage = () => {
  const [isLogin, setLogin] = useState(false);
  const [admin, setAdmin] = useState(null);

  const handleLogin = (data: any) => {
    if (data) {
      setLogin(true);
      setAdmin(data);
    }
  };

  const handleLogout = () => {
    setLogin(false), setAdmin(null);
  };

  return (
    <Layout>
      {!isLogin ? (
        <AdminLoginForm callback={(data) => handleLogin(data)} />
      ) : (
        <AdminPage admin={admin} onLogout={handleLogout} />
      )}
    </Layout>
  );
};

export default Admin;
