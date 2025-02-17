import { useState } from "react";
import { Button, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MdAdd } from "react-icons/md";
import { MOBILE_BREAK_POINT } from "../../../constants";
import ActionFormInput from "./ActionFormInput";

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

/**
 * ToggleInputForm component renders a toggleable input form.
 *
 * @component
 * @param {Object} buttonConfig - Configuration for the toggle button.
 * @param {Object} inputConfig - Configuration for the input form.
 * @param {Function} onSubmit - Function to handle form submission.
 * @returns {JSX.Element} ToggleInputForm component.
 */
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
      <Flex
        mt="8"
        mb="8"
        justify="center"
        align="center"
        style={{ height: "50px" }}
      >
        <Button
          size={isMobile ? "compact-xs" : "compact-sm"}
          leftSection={<MdAdd size={14} />}
          onClick={() => setIsInputOpen(true)}
          data-testid={buttonConfig.testId}
        >
          {isMobile
            ? buttonConfig.mobileLabel || buttonConfig.label
            : buttonConfig.label}
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      mt="8"
      mb="8"
      justify="center"
      align="center"
      style={{ height: "50px" }}
    >
      <ActionFormInput
        placeholder={inputConfig.placeholder}
        submitLabel={inputConfig.submitLabel}
        submitHandler={onSubmit}
        dismissInput={handleDismiss}
        validate={inputConfig.validate}
      />
    </Flex>
  );
};

export default ToggleInputForm;
