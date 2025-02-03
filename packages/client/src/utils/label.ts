import { LABELS } from "../constants";
import { LabelConfig } from "../types";

export function getLabelConfig(labelId: string): LabelConfig {
  const config = Object.values(LABELS).find((label) => label.id === labelId);
  return config || LABELS.SPECIAL;
}
