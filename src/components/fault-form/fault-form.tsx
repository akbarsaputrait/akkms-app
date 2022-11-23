import { Button, Card, CardBody, Option, Select } from "@material-tailwind/react";
import { useState } from "react";

import styles from "./fault-form.module.css";

interface FaultProps {
  onCancel: () => void;
}

export const FaultForm = ({ onCancel }: FaultProps) => {
  const [conductType, setconductType] = useState(null);

  const handleChange = (value) => {
    setconductType(value);
  };

  return (
    <Card className="w-full mt-4">
      <CardBody className={styles.formFault}>
        <Select label="Pilih Jenis Pelanggaran" value={conductType} onChange={handleChange}>
          <Option value="123">Kehadiran di Kelas/Sekolah</Option>
        </Select>

        <Select label="Pilih Pelanggaran">
          <Option>Datang &gt; jam 7.15</Option>
        </Select>

        <Button variant="filled" fullWidth size="md" color="blue">
          Simpan
        </Button>
        <Button variant="outlined" fullWidth size="md" color="blue-gray" onClick={onCancel}>
          Batalkan Pelanggaran
        </Button>
      </CardBody>
    </Card>
  );
};
