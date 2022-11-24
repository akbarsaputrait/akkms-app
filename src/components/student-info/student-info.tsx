import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { FaultForm } from "../fault-form/fault-form";
import { LogFault } from "../log-fault/log-fault";
import styles from "./student-info.module.css";

interface Student {
  id: string;
  nis: string;
  name: string;
  gender: "L" | "P";
  class: string;
  scores: number;
  callback: () => void;
}

interface StudentProps {
  data: Student;
}

export const StudentInfo = ({ data }: StudentProps) => {
  const [user, setUser] = useState(data);
  const [userId, setUserId] = useState(data.id);
  const [loading, setLoading] = useState(false);

  const [isShowFault, setShowFault] = useState(false);
  const handleShowFault = (value) => {
    setShowFault(value);
    setShowLogs(false);
  };

  const [isShowLogs, setShowLogs] = useState(false);
  const handleShowLogs = (value) => {
    setShowLogs(value);
    setShowFault(false);
  };

  const handleonSubmit = (userId) => {
    alert("Pelanggaran berhasil ditambahkan");
    setUserId("");
    setTimeout(() => {
      setUserId(userId);
    }, 150);
  };

  useEffect(() => {
    setLoading(true);
    const refetchUser = async () => {
      if (userId != "") {
        fetch(`${process.env.API_URL}/auth/me?id=${userId}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              response.json().then(({ data }) => setUser(data));
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    refetchUser();
  }, [userId]);

  return (
    <>
      <Card className="w-full m-4">
        <CardHeader floated={true} className={styles.avatar} shadow={false} color="transparent">
          <Image
            src={`/images/${user.gender === "L" ? "boy.png" : "girl.png"}`}
            alt="profile-picture"
            width={300}
            height={140}
            priority
          />
        </CardHeader>
        <CardBody className="text-center p-4">
          <Typography variant="h6" className="mb-2 text-gray-500 font-normal">
            Nomor Induk Siswa: {user.nis || "-"}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {user.name || "-"}
          </Typography>
          <Typography color="blue" className="font-medium" textGradient>
            {user.class || "-"}
          </Typography>
          <Typography className="mt-4" variant="paragraph">
            Scores:
          </Typography>
          {loading ? (
            <>
              <div className={styles.ldsRipple}>
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            <>
              <Typography variant="h2">{user.scores || 0}</Typography>
            </>
          )}
        </CardBody>

        <CardFooter className={styles.footer}>
          <Typography variant="small" className="flex justify-center">
            Apa kamu melanggar lagi? 😭
          </Typography>

          {isShowFault ? null : (
            <>
              <Button variant="filled" fullWidth size="md" onClick={() => handleShowFault(true)}>
                Pilih Pelanggaran
              </Button>
            </>
          )}

          {!isShowLogs ? (
            <>
              {" "}
              <Button
                variant="filled"
                fullWidth
                size="md"
                color="blue-gray"
                onClick={() => handleShowLogs(true)}>
                Riwayat Pelanggaran
              </Button>
            </>
          ) : null}

          <Button variant="text" fullWidth size="md" color="red" onClick={data.callback}>
            Keluar
          </Button>
        </CardFooter>
      </Card>

      {isShowFault ? (
        <>
          <FaultForm
            userId={userId}
            onCancel={() => handleShowFault(false)}
            onSubmit={(user) => {
              handleonSubmit(user);
            }}
          />
        </>
      ) : (
        ""
      )}

      {isShowLogs ? (
        <>
          <LogFault userId={user.id} onClose={() => handleShowLogs(false)} />
        </>
      ) : (
        ""
      )}
    </>
  );
};
