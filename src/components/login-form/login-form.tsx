import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

import styles from "./login-form.module.css";

interface LoginProps {
  callback: (data: any) => void;
}

export default function LoginForm({ callback }: LoginProps) {
  const [nis, setNis] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestLogin = () => {
    setLoading(true);
    fetch("https://akkms-sma1ngawi.up.railway.app/api/auth", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        nis,
        pin,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(({ data }) => {
            callback(data);
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
    <Card className="w-full">
      <CardHeader floated={true} className={styles.avatar} shadow={false} color="transparent">
        <Image
          src="/images/boy-and-girl.png"
          alt="profile-picture"
          width={300}
          height={140}
          priority
        />
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <Alert
          show={error != ""}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          dismissible={{
            onClose: () => setError(""),
          }}
          color="red">
          {error}
        </Alert>
        <Input
          label="Nomor Indus Siswa"
          size="lg"
          className="mb-4"
          type="number"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
          required
        />
        <Input
          label="PIN"
          size="lg"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={requestLogin} disabled={loading}>
          Masuk
        </Button>
      </CardFooter>
    </Card>
  );
}
