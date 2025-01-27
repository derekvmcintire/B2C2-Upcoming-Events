/**
 * Determines the color of the progress bar based on the number of riders.
 *
 * @returns {string} The color name for the progress bar.
 */
export const getHypeColor = (numberOfRiders: number): string => {
  if (numberOfRiders > 10) return "red";
  if (numberOfRiders > 8) return "orange";
  if (numberOfRiders > 5) return "yellow";
  if (numberOfRiders > 3) return "green";
  if (numberOfRiders > 1) return "blue";
  return "purple";
};
