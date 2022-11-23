import { Alert, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";

import { SelectConductNames } from "../select-conduct-name/select-conduct-name";
import { SelectConductTypes } from "../select-conduct-types/select-conduct-types";
import styles from "./fault-form.module.css";

interface FaultProps {
  userId: string;
  onCancel: () => void;
  onSubmit: (value) => void;
}

export const FaultForm = ({ userId, onCancel, onSubmit }: FaultProps) => {
  const [date] = useState(
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeZone: "Asia/Jakarta",
    }).format(new Date()),
  );
  const [typeId, setTypeId] = useState("");
  const [nameId, setNameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestConduct = async () => {
    setLoading(true);
    fetch(`${process.env.API_URL}/conducts`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: userId,
        conduct: nameId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(({ data }) => {
            onSubmit(data);
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
      <CardBody className={styles.formFault}>
        <Typography variant="paragraph">Hari & Tanggal:</Typography>
        <b className="mt-0">{date}</b>

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

        <SelectConductTypes onChange={(id) => setTypeId(id)} />
        {typeId != "" ? (
          <>
            <SelectConductNames typeId={typeId} onChange={(id) => setNameId(id)} />
          </>
        ) : null}

        <Button
          variant="filled"
          fullWidth
          size="md"
          color="blue"
          disabled={loading || !typeId || !nameId}
          onClick={requestConduct}>
          {loading ? "Mohon tunggu..." : "Simpan"}
        </Button>
        <Button variant="outlined" fullWidth size="md" color="blue-gray" onClick={onCancel}>
          Batalkan Pelanggaran
        </Button>
      </CardBody>
    </Card>
  );
};
