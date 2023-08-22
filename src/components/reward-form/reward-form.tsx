import { Alert, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";

import { SelectReward } from "../select-reward/select-reward";
import styles from "./reward-form.module.css";

interface RewardProps {
  userId: string;
  onCancel: () => void;
  onSubmit: (value) => void;
}

export const RewardForm = ({ userId, onCancel, onSubmit }: RewardProps) => {
  const [date] = useState(
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeZone: "Asia/Jakarta",
    }).format(new Date()),
  );
  const [rewardId, setRewardId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestConduct = async () => {
    setLoading(true);
    fetch(`${process.env.API_URL}/rewards`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: userId,
        reward: rewardId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(() => {
            onSubmit(userId);
            onCancel();
          });
        } else {
          response.json().then(({ message }) => {
            setError(message);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-full mt-4">
      <CardBody className={styles.formReward}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="lead">Konsekuensi</Typography>
          <Button size="sm" color="red" variant="outlined" onClick={onCancel}>
            Tutup
          </Button>
        </div>

        <p className="mb-0">Hari dan Tanggal:</p>
        <b className="mt-0">{date}</b>

        <Alert
          open={error != ""}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          onClose={() => setError("")}
          color="red">
          {error}
        </Alert>

        <SelectReward onChange={(id) => setRewardId(id)} />

        <Button
          variant="filled"
          fullWidth
          size="md"
          color="blue"
          disabled={loading || !rewardId}
          onClick={requestConduct}>
          {loading ? "Mohon tunggu..." : "Simpan"}
        </Button>
      </CardBody>
    </Card>
  );
};
