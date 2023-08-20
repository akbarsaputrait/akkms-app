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

import InputPassword from "../InputPassword";
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
    fetch(`${process.env.API_URL}/auth`, {
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

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      requestLogin();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader floated={true} className={styles.avatar} shadow={false} color="transparent">
        <Image
          src="/images/boy-and-girl.png"
          alt="profile-picture"
          width={250}
          height={100}
          priority
        />
      </CardHeader>
      <CardBody className={styles.cardBody}>
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
        <Input
          label="Nomor Indus Siswa"
          size="lg"
          className="mb-4"
          type="number"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
          disabled={loading}
          required
        />

        <InputPassword
          label="PIN"
          onChange={(value) => setPin(value)}
          disabled={loading}
          required
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          onClick={requestLogin}
          disabled={loading || !nis || !pin}>
          <div className="flex flex-row justify-center items-center">
            {loading ? "Mohon tunggu..." : "Masuk"}
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}
