import { useState, useEffect, ChangeEvent } from "react";
import { useDebounce } from "./useDebounce";

type UseFormInputProps = {
  initialValue?: string;
  validate?: (value: string) => boolean;
  validateDelay?: number;
};

export function useFormInput({
  initialValue = "",
  validate = () => true,
  validateDelay = 500,
}: UseFormInputProps = {}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const debouncedValue = useDebounce(value, validateDelay);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsTyping(true);
  };

  useEffect(() => {
    if (isTyping) {
      if (debouncedValue && !validate(debouncedValue)) {
        setError("Invalid input");
      } else {
        setError("");
      }
      setIsTyping(false);
    }
  }, [debouncedValue, validate, isTyping]);

  const reset = () => {
    setValue(initialValue);
    setError("");
  };

  return {
    value,
    error,
    handleChange,
    reset,
    isValid: error === "",
  };
}
