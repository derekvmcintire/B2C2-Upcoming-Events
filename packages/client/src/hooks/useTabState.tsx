import { useState, useCallback } from "react";
import { useEventData } from "./useEventData";
import {
  getDisciplineIdFromText,
  getDisciplineParamFromTextOrId,
} from "../utils/discipline";

/**
 * Defines the shape of the object returned by the `useTabState` hook.
 */
export interface UseTabStateReturn {
  activeTab: string | null;
  handleTabChange: (disciplineText: string | null) => void;
}

/**
 * A custom hook for managing tab state and triggering event-related data fetching when tabs change.
 *
 * @param {string} defaultTab - The default active tab.
 * @param {boolean} eventsLoading - Indicates if events are currently loading.
 * @param {boolean} registrationsLoading - Indicates if registrations are currently loading.
 * @returns {UseTabStateReturn} An object containing the active tab and a function to handle tab changes.
 */
export const useTabState = (
  defaultTab: string,
  eventsLoading: boolean,
  registrationsLoading: boolean,
): UseTabStateReturn => {
  const [activeTab, setActiveTab] = useState<string | null>(defaultTab);
  const { getRegisteredRiders, getEvents, setEventsLoading } = useEventData();

  /**
   * Handles changes to the active tab. Fetches event and registration data for the selected tab.
   *
   * @param {string | null} disciplineText - The discipline name or null.
   */
  const handleTabChange = useCallback(
    (disciplineText: string | null) => {
      if (!disciplineText || eventsLoading || registrationsLoading) return;

      setEventsLoading(true);

      const disciplineId = getDisciplineIdFromText(disciplineText);
      getRegisteredRiders({
        disciplineParam: getDisciplineParamFromTextOrId(disciplineText),
      });
      getEvents({ disciplineId });
      setActiveTab(disciplineText);
    },
    [
      eventsLoading,
      registrationsLoading,
      getRegisteredRiders,
      getEvents,
      setEventsLoading,
    ],
  );

  return { activeTab, handleTabChange };
};
