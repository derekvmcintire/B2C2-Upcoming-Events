import React from "react";
import {
  TextInput,
  Select,
  MultiSelect,
  Textarea,
  Checkbox,
  Stack,
} from "@mantine/core";
import classes from "./submit.module.css";

interface FormCoreProps {
  formData: any;
  isQuickContes?: boolean;
  disciplineOptions: { value: string; label: string }[];
  labelOptions: { value: string; label: string }[];
  onUpdate: (updates: any) => void;
  onToggleVirtual: (isVirtual: boolean) => void;
  onDisciplineChange: (value: string | null) => void;
}

/**
 * SpecialEventFormCore component is a form for submitting special events.
 *
 * @component
 * @param {FormCoreProps} props - The component props.
 * @param {FormData} props.formData - The form data.
 * @param {boolean} [props.isQuickContes=false] - Flag indicating if it's a quick contest.
 * @param {DisciplineOption[]} props.disciplineOptions - The discipline options.
 * @param {LabelOption[]} props.labelOptions - The label options.
 * @param {Function} props.onUpdate - The update event handler.
 * @param {Function} props.onToggleVirtual - The toggle virtual event handler.
 * @param {Function} props.onDisciplineChange - The discipline change event handler.
 * @returns {JSX.Element} The SpecialEventFormCore component.
 */
export const SpecialEventFormCore: React.FC<FormCoreProps> = ({
  formData,
  isQuickContes = false,
  disciplineOptions,
  labelOptions,
  onUpdate,
  onToggleVirtual,
  onDisciplineChange,
}) => {
  const {
    name,
    date,
    city,
    state,
    discipline,
    labels,
    description,
    isVirtual,
    eventUrl,
    housingUrl,
  } = formData;

  return (
    <Stack w="100%" className={classes.formCore}>
      <Checkbox
        label="This is a virtual event"
        checked={isVirtual}
        onChange={(event) => onToggleVirtual(event.currentTarget.checked)}
      />
      <TextInput
        label="Event Name"
        className={classes.formInput}
        placeholder="Name*"
        value={name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        required
        disabled={isQuickContes}
      />
      <TextInput
        label="Event Date"
        className={classes.formInput}
        placeholder="Date*"
        type="date"
        value={date}
        onChange={(e) => onUpdate({ date: e.target.value })}
        required
      />
      <TextInput
        label="Event City"
        className={classes.formTextInput}
        placeholder="City*"
        value={city}
        onChange={(e) => onUpdate({ city: e.target.value })}
        required
        disabled={isQuickContes}
      />
      <TextInput
        label="Event State"
        className={classes.formInput}
        placeholder="State*"
        value={state}
        onChange={(e) => onUpdate({ state: e.target.value })}
        required
        disabled={isQuickContes}
      />
      <Select
        label="Event Discipline"
        className={`${classes.formInput} ${classes.disciplineInput}`}
        placeholder="Event Discipline"
        value={discipline}
        onChange={onDisciplineChange}
        required
        data={disciplineOptions}
        disabled={isQuickContes}
      />
      <MultiSelect
        label="Event Labels"
        placeholder="Event Labels"
        data={labelOptions}
        value={Array.from(labels)}
        onChange={(values) => onUpdate({ labels: new Set(values) })}
      />
      <TextInput
        label="Event URL"
        className={classes.formInput}
        placeholder="Event URL (optional)"
        value={eventUrl}
        onChange={(e) => onUpdate({ eventUrl: e.target.value })}
        disabled={isQuickContes}
      />
      <TextInput
        label="Housing URL"
        className={classes.formInput}
        placeholder="Housing URL (optional)"
        value={housingUrl}
        onChange={(e) => onUpdate({ housingUrl: e.target.value })}
        disabled={isQuickContes}
      />
      <Textarea
        label="Event Description"
        placeholder="Add a description"
        value={description}
        onChange={(event) =>
          onUpdate({ description: event.currentTarget.value })
        }
      />
    </Stack>
  );
};
