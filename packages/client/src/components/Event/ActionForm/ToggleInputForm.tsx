import { useState } from "react";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MdAdd } from "react-icons/md";
import { MOBILE_BREAK_POINT } from "../../../constants";
import EventCardInput from "./ActionFormInput";

interface ToggleFormProps {
  // Button configuration
  buttonConfig: {
    label: string;
    mobileLabel?: string;
    variant?: string;
    color?: string;
    testId?: string;
  };
  // Input configuration
  inputConfig: {
    placeholder: string;
    submitLabel?: string;
    validate: (value: string) => boolean;
  };
  // Handler for form submission
  onSubmit: (value: string) => void;
}

const ToggleInputForm = ({
  buttonConfig,
  inputConfig,
  onSubmit,
}: ToggleFormProps) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const handleDismiss = () => {
    setIsInputOpen(false);
  };

  if (!isInputOpen) {
    return (
      <Button
        variant={buttonConfig.variant || "outline"}
        size={isMobile ? "compact-xs" : "compact-sm"}
        color="gray"
        c="gray"
        leftSection={<MdAdd size={14} />}
        onClick={() => setIsInputOpen(true)}
        data-testid={buttonConfig.testId}
      >
        {isMobile
          ? buttonConfig.mobileLabel || buttonConfig.label
          : buttonConfig.label}
      </Button>
    );
  }

  return (
    <EventCardInput
      placeholder={inputConfig.placeholder}
      submitLabel={inputConfig.submitLabel}
      submitHandler={onSubmit}
      dismissInput={handleDismiss}
      validate={inputConfig.validate}
    />
  );
};

export default ToggleInputForm;
