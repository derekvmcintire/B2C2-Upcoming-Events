import { DISCIPLINES } from "../constants";
import { EventDiscipline, EventDisciplineParam } from "../types";

/**
 * Returns the discipline ID associated with the given discipline text.
 *
 * @param {string} disciplineText - The text representing the discipline (e.g., "Road", "CX").
 * @returns {EventDiscipline} The corresponding discipline ID. Defaults to the "ROAD" discipline ID if no match is found.
 */
export function getDisciplineIdFromText(
  disciplineText: string,
): EventDiscipline {
  switch (disciplineText) {
    case DISCIPLINES.ROAD.text:
      return DISCIPLINES.ROAD.id;
    case DISCIPLINES.CX.text:
      return DISCIPLINES.CX.id;
    case DISCIPLINES.XC.text:
      return DISCIPLINES.XC.id;
    case DISCIPLINES.SPECIAL.text:
      return DISCIPLINES.SPECIAL.id;
    default:
      return DISCIPLINES.ROAD.id;
  }
}

/**
 * Returns the query parameter associated with a given discipline ID or text.
 *
 * @param {string} disciplineId - The discipline ID or text representing the discipline.
 * @returns {EventDisciplineParam} The corresponding query parameter. Defaults to the "ROAD" discipline query parameter if no match is found.
 */
export function getDisciplineParamFromTextOrId(
  disciplineId: string,
): EventDisciplineParam {
  switch (disciplineId) {
    case DISCIPLINES.ROAD.id || DISCIPLINES.ROAD.text:
      return DISCIPLINES.ROAD.queryParam;
    case DISCIPLINES.CX.id || DISCIPLINES.CX.text:
      return DISCIPLINES.CX.queryParam;
    case DISCIPLINES.XC.id || DISCIPLINES.XC.text:
      return DISCIPLINES.XC.queryParam;
    case DISCIPLINES.SPECIAL.id || DISCIPLINES.SPECIAL.text:
      return DISCIPLINES.SPECIAL.queryParam;
    default:
      return DISCIPLINES.ROAD.queryParam;
  }
}

/**
 * Validates if the selected value is a valid EventDiscipline.
 *
 * @param value - The selected value from the dropdown.
 * @returns True if the value is a valid EventDiscipline, otherwise false.
 */
export const isEventDiscipline = (
  value: string | null,
): value is EventDiscipline => {
  return (
    value !== null && Object.values(DISCIPLINES).some((d) => d.id === value)
  );
};
