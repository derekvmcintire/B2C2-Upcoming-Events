import { LABELS } from "../constants";

export const getLabelConfig = (eventType: string) =>
  eventType === "special" ? LABELS.TRIP : LABELS.RACE;
