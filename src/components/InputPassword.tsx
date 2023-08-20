import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

interface InputPasswordProps {
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  required?: boolean;
  onKeyPress?: (event) => void;
}

const InputPassword = ({ label, disabled, required, onChange, onKeyPress }: InputPasswordProps) => {
  const [type, setType] = useState<"password" | "text">("password");

  const handleToggle = (e, val) => {
    setType(val);
  };

  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        label={label}
        size="lg"
        onChange={(e) => onChange(e.target.value)}
        type={type}
        disabled={disabled}
        required={required}
        onKeyUp={onKeyPress}
      />

      <Button
        size="sm"
        className="!absolute right-0 top-1 rounded"
        variant="text"
        onClick={(e) => handleToggle(e, type === "password" ? "text" : "password")}>
        {type === "password" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="grey"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2">
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
              <path d="M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6" />
            </g>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="grey"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2">
              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
              <path d="M16.681 16.673A8.717 8.717 0 0 1 12 18c-3.6 0-6.6-2-9-6c1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146A9.055 9.055 0 0 1 12 6c3.6 0 6.6 2 9 6c-.666 1.11-1.379 2.067-2.138 2.87M3 3l18 18" />
            </g>
          </svg>
        )}
      </Button>
    </div>
  );
};

export default InputPassword;
