import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { ChangePinForm } from "../change-pin-form/change-pin-form";
import { FaultForm } from "../fault-form/fault-form";
import { LogFault } from "../log-fault/log-fault";
import { RewardForm } from "../reward-form/reward-form";
import styles from "./student-info.module.css";

export interface IStudent {
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
}

interface StudentProps {
  data: IStudent;
  isAdmin: boolean;
  callback?: () => void;
}

export const StudentInfo = ({ data, isAdmin = false, callback }: StudentProps) => {
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

  const handleOnSubmit = (userId, message = "") => {
    if (message) alert(message);

    setUserId("");
    setTimeout(() => {
      setUserId(userId);
    }, 150);
  };

  const [isChangePin, setChangePin] = useState(false);
  const handleChangePin = (value) => {
    setChangePin(value);
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
        return "text-purple-500";
      case "major":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleOnConfirm = (e, id, status) => {
    e.preventDefault();
    const confirmed = confirm("Anda yakin untuk mengkonfirmasi permintaan konsekuensi ini?");
    if (confirmed) {
      fetch(`${process.env.API_URL}/admin/students/${userId}/conducts`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then(({ data }) => {
              handleOnSubmit(data.userId, "Berhasil memperbarui Konsekuensi");
              setShowLogs(false);
              const timeout = setTimeout(() => {
                setShowLogs(true);
              }, 150);
              clearTimeout(timeout);
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    const refetchUser = async () => {
      if (userId != "") {
        const endpoint = isAdmin ? `admin/students/${userId}` : `auth/me/?id=${userId}`;
        fetch(`${process.env.API_URL}/${endpoint}`, {
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
  }, [userId, isAdmin]);

  return (
    <>
      {!isChangePin ? (
        <div className="flex flex-col gap-4 w-full">
          <Card className="w-full">
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
              {!isAdmin && (
                <>
                  {isShowFault ? null : (
                    <>
                      <Button
                        variant="gradient"
                        fullWidth
                        size="lg"
                        onClick={() => handleShowFault(true)}
                        color="orange">
                        Pelanggaran
                      </Button>
                    </>
                  )}

                  {isShowReward ? null : (
                    <>
                      <Button
                        variant="gradient"
                        fullWidth
                        size="lg"
                        color="green"
                        onClick={handleShowReward}>
                        Konsekuensi
                      </Button>
                    </>
                  )}
                </>
              )}

              {!isShowLogs ? (
                <>
                  {" "}
                  <Button fullWidth size="lg" onClick={() => handleShowLogs(true)}>
                    Riwayat
                  </Button>
                </>
              ) : null}
            </CardFooter>
          </Card>

          {isShowFault ? (
            <>
              <FaultForm
                userId={userId}
                onCancel={() => handleShowFault(false)}
                onSubmit={(user) => {
                  handleOnSubmit(
                    user,
                    "Pelanggaran berhasil ditambahkan. Jangan melanggar lagi yaa 🥺",
                  );
                }}
              />
            </>
          ) : null}

          {isShowLogs ? (
            <>
              <LogFault
                student={user}
                onClose={() => handleShowLogs(false)}
                isAdmin={isAdmin}
                onConfirm={(e, id, status) => handleOnConfirm(e, id, status)}
              />
            </>
          ) : null}

          {isShowReward ? (
            <>
              <RewardForm
                userId={user.id}
                onCancel={() => handleShowReward(false)}
                onSubmit={(user) => {
                  handleOnSubmit(
                    user,
                    "Konsekuensi berhasil ditambahkan. Silahkan konfirmasi kepada Admin. Selamat dan sukses selalu 😇🥰",
                  );
                }}
              />
            </>
          ) : null}

          {!isAdmin && (
            <Button fullWidth size="sm" color="white" variant="text" onClick={handleChangePin}>
              Ganti PIN
            </Button>
          )}
        </div>
      ) : (
        <ChangePinForm userId={user.id} onClose={() => setChangePin(false)} />
      )}

      {!isAdmin && (
        <Button size="sm" color="red" onClick={callback} className="mt-4">
          Keluar
        </Button>
      )}
    </>
  );
};
