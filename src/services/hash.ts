import { AES, enc } from "crypto-js";

const SECRET = "1241212512";
const encrypt = (value: string) => {
  return AES.encrypt(value, SECRET).toString(enc.Utf8);
};

const decrypt = (value: string) => {
  return AES.decrypt(value, SECRET).toString(enc.Utf8);
};

export { decrypt, encrypt };
