import { DISCIPLINES } from "../constants";

export function getDisciplineId(disciplineText: string): string {
  switch(disciplineText) {
    case DISCIPLINES.ROAD.text:
      return DISCIPLINES.ROAD.id
    case DISCIPLINES.CX.text:
      return DISCIPLINES.CX.id
      case DISCIPLINES.XC.text:
        return DISCIPLINES.XC.id
    default:
      return DISCIPLINES.ROAD.id
  }
}
