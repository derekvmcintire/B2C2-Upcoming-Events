/**
 * Determines the color of the progress bar based on the number of riders.
 *
 * @returns {string} The color name for the progress bar.
 */
export const getHypeColor = (hypeLevel: number): string => {
  if (hypeLevel > 100) return "red";
  if (hypeLevel > 80) return "orange";
  if (hypeLevel > 50) return "yellow";
  if (hypeLevel > 30) return "green";
  if (hypeLevel > 10) return "blue";
  return "purple";
};

export const getHypeLevel = (
  registeredRiders: number,
  interestedRiders: number,
  numberOfCommittedRiders: number,
): number =>
  (registeredRiders + interestedRiders + numberOfCommittedRiders) * 10;
