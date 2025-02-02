/**
 * Determines the color of the progress bar based on the number of riders.
 *
 * @returns {string} The color name for the progress bar.
 */
export const getHypeColor = (hypeLevel: number): string => {
  if (hypeLevel > 100) return "#d50000";
  if (hypeLevel > 80) return "#ff6d00";
  if (hypeLevel > 50) return "#ffea00";
  if (hypeLevel > 30) return "#00c853";
  if (hypeLevel > 10) return "#2979ff";
  return "#6200ea";
};

export const getHypeLevel = (
  registeredRiders: number,
  interestedRiders: number,
  numberOfCommittedRiders: number,
): number =>
  (registeredRiders + interestedRiders + numberOfCommittedRiders) * 10;
