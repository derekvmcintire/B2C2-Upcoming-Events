import { DISCIPLINES } from "../constants";
import { EventDiscipline } from "../types";

export function getDisciplineId(disciplineText: string): EventDiscipline {
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
