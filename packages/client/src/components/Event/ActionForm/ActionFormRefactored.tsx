import { Flex } from "@mantine/core";
import ToggleInputForm from './ToggleInputForm';

interface ActionFormProps {
  handleSubmitInterestedRider: (value: string) => void;
}

const ActionFormRefactored = ({
  handleSubmitInterestedRider,
}: ActionFormProps) => {

  return (
    <Flex pr="16" justify="center" wrap="wrap">
      <ToggleInputForm
        buttonConfig={{
          label: "I'm interested",
          mobileLabel: "Interested",
          testId: "interested-button"
        }}
        inputConfig={{
          placeholder: "Add Interested Rider",
          validate: () => true
        }}
        onSubmit={handleSubmitInterestedRider}
      />
    </Flex>
  );
};

export default ActionFormRefactored;