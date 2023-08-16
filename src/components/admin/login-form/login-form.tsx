import { Alert, Button, Card, CardBody, CardFooter, Input } from "@material-tailwind/react";
import { useState } from "react";

import styles from "../../login-form/login-form.module.css";

interface LoginProps {
  callback: (data: any) => void;
}

const AdminLoginForm = ({ callback }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestLogin = () => {
    setLoading(true);
    fetch(`${process.env.API_URL}/admin/auth`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username,
        password,
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
          label="Username"
          size="lg"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label="Password"
          size="lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          required
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          onClick={requestLogin}
          disabled={loading || !username || !password}>
          <div className="flex flex-row justify-center items-center">
            {loading ? "Mohon tunggu..." : "Masuk"}
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminLoginForm;
