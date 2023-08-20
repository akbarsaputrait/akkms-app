import { Button } from "@material-tailwind/react";
import { useState } from "react";

import StudentList from "../student-list/student-list";

const AdminPage = ({ admin, onLogout }) => {
  const [isShowStudentList, setShowStudentList] = useState(false);

  const handleBack = () => {
    setShowStudentList(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <h3 className="text-center">Selamat datang, {admin.name}</h3>

      {!isShowStudentList ? (
        <div className="flex flex-col gap-4 w-full">
          <Button
            size="lg"
            fullWidth
            variant="gradient"
            color="blue"
            onClick={() => setShowStudentList(true)}>
            Daftar Siswa/Siswi
          </Button>
        </div>
      ) : (
        <Button variant="text" fullWidth size="md" onClick={handleBack}>
          Kembali
        </Button>
      )}

      {isShowStudentList && <StudentList />}

      <Button size="sm" color="red" onClick={onLogout} className="mt-4">
        Keluar
      </Button>
    </div>
  );
};
export default AdminPage;
