import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
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
  violation?: {
    action: string;
    name: string;
    level: "minor" | "disruptive" | "moderate" | "serious" | "major";
  };
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
    setShowReward(false);
  };

  const [isShowReward, setShowReward] = useState(false);
  const handleShowReward = (value) => {
    setShowReward(value);
    setShowFault(false);
    setShowLogs(false);
  };

  const [isShowLogs, setShowLogs] = useState(false);
  const handleShowLogs = (value) => {
    setShowLogs(value);
    setShowFault(false);
    setShowReward(false);
  };

  const handleonSubmit = (userId) => {
    alert("Pelanggaran berhasil ditambahkan");
    setUserId("");
    setTimeout(() => {
      setUserId(userId);
    }, 150);
  };

  const violationTextColor = (level) => {
    switch (level) {
      case "minor":
        return "text-blue-500";
      case "disruptive":
        return "text-yellow-500";
      case "moderate":
        return "text-orange-500";
      case "serious":
        return "text-red-500";
      case "major":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
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
        {/* <CardHeader floated={true} className={styles.avatar} shadow={false} color="transparent">
          <Image
            src={`/images/${user.gender === "L" ? "boy.png" : "girl.png"}`}
            alt="profile-picture"
            width={300}
            height={140}
            priority
          />
        </CardHeader> */}
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
            Skor:
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
              {user.violation ? (
                <>
                  <Typography
                    variant="h6"
                    className={`mb-2 font-bold text-md ${violationTextColor(
                      user.violation.level,
                    )}`}>
                    Hukuman: {user.violation.action}
                  </Typography>
                </>
              ) : null}
            </>
          )}
        </CardBody>

        <CardFooter className={styles.footer}>
          {isShowFault ? null : (
            <>
              <Button
                variant="filled"
                fullWidth
                size="md"
                onClick={() => handleShowFault(true)}
                color="red">
                Pelanggaran
              </Button>
            </>
          )}

          {isShowReward ? null : (
            <>
              <Button variant="filled" fullWidth size="md" color="green">
                Reward
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
                color="white"
                onClick={() => handleShowLogs(true)}>
                Riwayat
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
