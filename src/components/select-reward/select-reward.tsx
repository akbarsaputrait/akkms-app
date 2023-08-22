import { useEffect, useState } from "react";

import styles from "./select-reward.module.css";

interface SelectRewardProps {
  onChange: (value: string) => void;
}

export const SelectReward = ({ onChange }: SelectRewardProps) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchingTypes = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.API_URL}/rewards`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        res.json().then(({ data }) => setData(data));
      }

      setLoading(false);
    };

    fetchingTypes();
  }, []);

  const handleOnChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Pilih Konsekuensi
      </label>
      <select
        id="countries"
        className={styles.customSelect}
        disabled={loading}
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}>
        <option selected>{loading ? "Mohon tunggu..." : "--- Pilih ---"}</option>
        {data.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
