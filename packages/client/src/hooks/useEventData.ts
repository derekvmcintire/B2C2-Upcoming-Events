import { useCallback } from "react";
import { clearEventCache } from "../infrastructure/event-cache";
import { fetchRegistrations } from "../api/fetchRegisteredRiders";
import { fetchEventsByDiscipline } from "../api/fetchEventsByType";
import { useEventsContext } from "../context/events-context";
import { EventDiscipline, EventDisciplineParam } from "../types";
import { getDisciplineParamFromTextOrId } from "../utils/discipline";

/**
 * Defines the shape of the object returned by the `useEventData` hook.
 */
export interface UseEventDataReturn {
  getRegisteredRiders: (params: {
    disciplineParam: EventDisciplineParam;
    afterDate?: Date;
    skipCache?: boolean;
  }) => Promise<void>;
  getEvents: (params: {
    disciplineId: EventDiscipline;
    skipCache?: boolean;
  }) => Promise<void>;
  requestFreshDataForEventType: (disciplineId: EventDiscipline) => void;
  setEventsLoading: (isLoading: boolean) => void;
}

/**
 * A custom hook that provides functions to fetch and manage event-related data,
 * including registrations and events, while handling errors and loading states.
 *
 * @returns {UseEventDataReturn} An object containing functions to fetch and manage event data.
 */
export const useEventData = (): UseEventDataReturn => {
  const {
    setRegistrations,
    setEvents,
    setRegistrationsLoading,
    setEventsLoading,
    setIsSubmitting,
    setRequestFreshData,
    setErrors,
    errors,
  } = useEventsContext();

  /**
   * Adds a new error message to the current list of errors.
   *
   * @param {string} newError - The unique error identifier.
   * @param {string} [message] - An optional message prefix for the error.
   */
  const handleSetNewError = useCallback(
    (newError: string, message?: string): void => {
      const newErrors = [
        ...errors.filter((error) => error !== newError),
        `${message} ${newError}`,
      ];
      setErrors(newErrors);
    },
    [errors, setErrors],
  );

  /**
   * Fetches registered riders for a specific discipline, optionally skipping the cache.
   *
   * @param {Object} params - The parameters for fetching registered riders.
   * @param {EventDisciplineParam} params.disciplineParam - The discipline parameter.
   * @param {Date} [params.afterDate=new Date()] - Fetch registrations after this date.
   * @param {boolean} [params.skipCache=false] - Whether to bypass the cache.
   */
  const getRegisteredRiders = useCallback(
    async ({
      disciplineParam,
      afterDate = new Date(),
      skipCache = false,
    }: {
      disciplineParam: EventDisciplineParam;
      afterDate?: Date;
      skipCache?: boolean;
    }) => {
      const response = await fetchRegistrations({
        discipline: disciplineParam,
        after: afterDate,
        skipCache,
      });
      if (response.error) {
        handleSetNewError(response.error, "ERROR FETCHING REGISTERED RIDERS:");
      } else {
        setRegistrations(response);
      }
      setRegistrationsLoading(false);
    },
    [handleSetNewError, setRegistrations, setRegistrationsLoading],
  );

  /**
   * Fetches events for a specific discipline, optionally skipping the cache.
   *
   * @param {Object} params - The parameters for fetching events.
   * @param {EventDiscipline} params.disciplineId - The discipline ID.
   * @param {boolean} [params.skipCache=false] - Whether to bypass the cache.
   */
  const getEvents = useCallback(
    async ({
      disciplineId,
      skipCache = false,
    }: {
      disciplineId: EventDiscipline;
      skipCache?: boolean;
    }) => {
      const response = await fetchEventsByDiscipline({
        discipline: disciplineId,
        skipCache,
      });
      if (response.error) {
        handleSetNewError(
          response.error,
          `ERROR FETCHING ${disciplineId} EVENTS:`,
        );
      }
      setEvents(response.events);
      setEventsLoading(false);
      setIsSubmitting(false);
    },
    [handleSetNewError, setEvents, setEventsLoading, setIsSubmitting],
  );

  /**
   * Requests fresh data for a specific event type, bypassing the cache.
   *
   * @param {EventDiscipline} disciplineId - The discipline ID for which fresh data is requested.
   */
  const requestFreshDataForEventType = useCallback(
    (disciplineId: EventDiscipline) => {
      const disciplineParam = getDisciplineParamFromTextOrId(disciplineId);
      getRegisteredRiders({ disciplineParam, skipCache: true });
      getEvents({ disciplineId, skipCache: true });
      setRequestFreshData(undefined);
    },
    [clearEventCache, getRegisteredRiders, getEvents, setRequestFreshData],
  );

  return {
    getRegisteredRiders,
    getEvents,
    requestFreshDataForEventType,
    setEventsLoading,
  };
};
