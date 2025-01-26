import { useState, useEffect, ChangeEvent } from "react";
import { useDebounce } from "./useDebounce";

type UseFormInputProps = {
  initialValue?: string;
  validate?: (value: string) => boolean;
  validateDelay?: number;
};

type UseFormInputReturn = {
  value: string;
  error: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  isValid: boolean;
};

/**
 * A custom React hook to manage the state and validation of a form input field.
 *
 * @param {UseFormInputProps} props - Configuration options for the form input.
 * @param {string} [props.initialValue=""] - The initial value of the input field.
 * @param {(value: string) => boolean} [props.validate=() => true] - The validation function for the input.
 * @param {number} [props.validateDelay=500] - The debounce delay for validating input, in milliseconds.
 * @returns {UseFormInputReturn} - An object containing the input's value, error state, change handler, reset function, and validity status.
 */
export function useFormInput({
  initialValue = "",
  validate = () => true,
  validateDelay = 500,
}: UseFormInputProps = {}): UseFormInputReturn {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const debouncedValue = useDebounce(value, validateDelay);

  /**
   * Handles the change event for the input field. Updates the input value and sets the typing state.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event object.
   */
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

  /**
   * Resets the input value and error state to their initial values.
   */
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
