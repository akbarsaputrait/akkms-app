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
  const [isShowFault, setShowFault] = useState(false);
  const handleShowFault = (value) => setShowFault(value);

  const refetchUser = async () => {
    fetch(`${process.env.API_URL}/auth/me?id=${data.id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  };

  useEffect(() => {
    if (user) {
      refetchUser();
    }
  }, [user]);

  return (
    <>
      <Card className="w-full mt-4">
        <CardHeader floated={true} className={styles.avatar} shadow={false} color="transparent">
          <Image
            src={`/images/${data.gender === "L" ? "boy.png" : "girl.png"}`}
            alt="profile-picture"
            width={300}
            height={140}
            priority
          />
        </CardHeader>
        <CardBody className="text-center p-4">
          <Typography variant="h6" className="mb-2 text-gray-500 font-normal">
            Nomor Induk Siswa: {data.nis || "-"}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {data.name || "-"}
          </Typography>
          <Typography color="blue" className="font-medium" textGradient>
            {data.class || "-"}
          </Typography>
          <Typography className="mt-4" variant="paragraph">
            Scores:
          </Typography>
          <Typography variant="h2">{data.scores || 0}</Typography>
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

          <Button variant="text" fullWidth size="md" color="red" onClick={data.callback}>
            Keluar
          </Button>
        </CardFooter>
      </Card>

      {isShowFault ? (
        <>
          <FaultForm
            userId={data.id}
            onCancel={() => handleShowFault(false)}
            onSubmit={() => {
              alert("Pelanggaran berhasil ditambahkan");
            }}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};
