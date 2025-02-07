import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { LABELS, DISCIPLINES } from "../constants";
import { EventDiscipline } from "../types";
import { formatDateForStorage } from "../utils/dates";
import { isValidUrl } from "../utils/url";

interface UseSpecialEventFormProps {
  isQuickContes?: boolean;
}

/**
 * Custom hook for managing a special event form.
 *
 * @param {UseSpecialEventFormProps} options - The options for the special event form.
 * @returns {{
 *   formData: object,
 *   submissionState: object,
 *   disciplineOptions: object[],
 *   labelOptions: object[],
 *   methods: {
 *     updateFormData: (updates: Partial<typeof formData>) => void,
 *     toggleVirtual: (isVirtual: boolean) => void,
 *     validateForm: () => string,
 *     prepareSubmission: () => object,
 *     resetForm: (success: boolean) => void,
 *     setSubmissionState: (updates: Partial<typeof submissionState>) => void
 *   }
 * }} The special event form object.
 */
export const useSpecialEventForm = ({
  isQuickContes = false,
}: UseSpecialEventFormProps) => {
  const initialData = useMemo(
    () =>
      isQuickContes
        ? {
            city: "Lexington",
            state: "MA",
            name: "Conte's Group Ride",
            labels: [LABELS.CONTES.id, LABELS.GROUP.id],
            description: "9am start",
            isVirtual: false,
          }
        : {
            city: "",
            state: "",
            name: "",
            labels: [],
            description: "",
            isVirtual: false,
          },
    [isQuickContes],
  );

  const [formData, setFormData] = useState({
    city: initialData.city,
    date: "",
    name: initialData.name,
    state: initialData.state,
    discipline: DISCIPLINES.SPECIAL.id as EventDiscipline,
    labels: new Set(initialData.labels),
    description: initialData.description,
    isVirtual: initialData.isVirtual,
    eventUrl: "",
    housingUrl: "",
  });

  const [submissionState, setSubmissionState] = useState({
    isSubmitting: false,
    error: "",
    showSuccess: false,
  });

  const disciplineOptions = useMemo(
    () =>
      Object.values(DISCIPLINES).map((d) => ({
        value: d.id,
        label: d.text,
      })),
    [],
  );

  const labelOptions = useMemo(
    () =>
      Object.values(LABELS).map((l) => ({
        value: l.id,
        label: l.text,
      })),
    [],
  );

  /**
   * Updates the form data with the provided updates.
   * @param updates - Partial data to update the form with.
   */
  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const toggleVirtual = (isVirtual: boolean) => {
    if (isVirtual) {
      updateFormData({
        city: "Wattopia",
        state: "Zwift",
        labels: new Set([...formData.labels, LABELS.VIRTUAL.id]),
        isVirtual: true,
      });
    } else {
      updateFormData({
        city: initialData.city,
        state: initialData.state,
        labels: new Set(initialData.labels),
        isVirtual: false,
      });
    }
  };

  /**
   * Validates the form data for a special event.
   * @returns An error message if any required fields are missing or if the URLs are invalid, otherwise an empty string.
   */
  const validateForm = () => {
    const { city, date, name, state, eventUrl, housingUrl } = formData;

    if (!city.trim()) return "City is required";
    if (!date.trim()) return "Date is required";
    if (!name.trim()) return "Name is required";
    if (!state.trim()) return "State is required";

    if (eventUrl && !isValidUrl(eventUrl))
      return "Invalid event URL, please include http://";
    if (housingUrl && !isValidUrl(housingUrl)) return "Invalid housing URL";

    return "";
  };

  /**
   * Prepares the form data for submission by transforming and modifying the values.
   * @returns The prepared form data object.
   */
  const prepareSubmission = () => ({
    ...formData,
    eventId: uuidv4(),
    eventType: formData.discipline,
    date: formatDateForStorage(formData.date),
    labels: Array.from(formData.labels),
    eventUrl: formData.eventUrl || undefined,
    housingUrl: formData.housingUrl || undefined,
  });

  /**
   * Resets the form by setting the form data to its initial state and updating the submission state.
   * @param success - A boolean indicating whether the form submission was successful.
   */
  const resetForm = (success: boolean) => {
    setFormData({
      ...initialData,
      date: "",
      eventUrl: "",
      housingUrl: "",
      discipline: DISCIPLINES.SPECIAL.id,
      labels: new Set(initialData.labels),
    });
    setSubmissionState({
      isSubmitting: false,
      error: "",
      showSuccess: success,
    });
  };

  return {
    formData,
    submissionState,
    disciplineOptions,
    labelOptions,
    methods: {
      updateFormData,
      toggleVirtual,
      validateForm,
      prepareSubmission,
      resetForm,
      setSubmissionState: (updates: Partial<typeof submissionState>) =>
        setSubmissionState((prev) => ({ ...prev, ...updates })),
    },
  };
};
