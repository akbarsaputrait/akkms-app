import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

interface ChangePinProps {
  userId: string;
  onClose?: () => void;
}

export const ChangePinForm = ({ userId, onClose }: ChangePinProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");

  const requestChangePin = async () => {
    setLoading(true);
    fetch(`${process.env.API_URL}/auth/me`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: userId,
        oldPin,
        newPin,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(() => {
            alert("PIN berhasil diperbarui");
            onClose();
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
    <Card className="mx-auto w-full max-w-[24rem] h-fit m-4">
      <CardBody className="flex flex-col gap-4 h-fit">
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

        <Typography color="black" className="font-medium">
          Ganti PIN
        </Typography>
        <Input
          label="PIN Lama"
          size="lg"
          onChange={(e) => setOldPin(e.target.value)}
          type="tel"
          disabled={loading}
          required
        />
        <Input
          label="PIN Baru"
          size="lg"
          onChange={(e) => setNewPin(e.target.value)}
          type="tel"
          disabled={loading}
          required
        />
      </CardBody>
      <CardFooter className="pt-0 flex flex-col gap-4">
        <Button
          variant="gradient"
          disabled={!oldPin || !newPin || loading}
          onClick={requestChangePin}
          fullWidth>
          {loading ? "Mohon tunggu..." : "Simpan"}
        </Button>
        <Button variant="gradient" color="red" disabled={loading} onClick={onClose} fullWidth>
          Batal
        </Button>
      </CardFooter>
    </Card>
  );
};
