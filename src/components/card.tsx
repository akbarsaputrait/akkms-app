import { Button, Card, CardBody, CardFooter, Input } from "@material-tailwind/react";

export default function CardExample() {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col">
        <Input label="Nomor Indus Siswa" size="lg" className="m-13" type="number" />
        <Input label="PIN" size="lg" type="number" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Masuk
        </Button>
      </CardFooter>
    </Card>
  );
}
