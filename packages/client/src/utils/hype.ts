/**
 * Determines the color of the progress bar based on the number of riders.
 *
 * @returns {string} The color name for the progress bar.
 */
export const getHypeColor = (hypeLevel: number): string => {
  if (hypeLevel > 100) return "#e53935";
  if (hypeLevel > 80) return "#fb8c00";
  if (hypeLevel > 50) return "#fdd835";
  if (hypeLevel > 30) return "#43a047";
  if (hypeLevel > 11) return "#1e88e5";
  return "#8e24aa";
};

export const getHypeLevel = (
  registeredRiders: number,
  interestedRiders: number,
  numberOfCommittedRiders: number,
): number =>
  (registeredRiders + interestedRiders + numberOfCommittedRiders) * 10;
