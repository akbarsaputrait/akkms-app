import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@material-tailwind/react";
import Image from "next/image";

import styles from "./login-form.module.css";

interface LoginProps {
  callback: () => void;
}

export default function LoginForm({ callback }: LoginProps) {
  return (
    <Card className="w-full">
      <CardHeader floated={true} className={styles.avatar} shadow={false} color="transparent">
        <Image src="/images/boy-and-girl.png" alt="profile-picture" width={300} height={140} />
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <Input label="Nomor Indus Siswa" size="lg" className="mb-4" type="number" required />
        <Input label="PIN" size="lg" type="number" required />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={callback}>
          Masuk
        </Button>
      </CardFooter>
    </Card>
  );
}
