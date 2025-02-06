import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to determine if a referenced element is visible on the screen using the Intersection Observer API.
 *
 * @param {number} threshold - A number between 0 and 1 indicating at what percentage of the target's visibility
 *   the observer's callback should be executed. Default is 0.1 (10% visibility).
 *
 * @returns {readonly [React.RefObject<HTMLDivElement>, boolean]} An array with two values:
 *   - `ref`: A React ref object that should be attached to the element you want to observe.
 *   - `isVisible`: A boolean indicating if the element is currently visible on the screen.
 */
export const useOnScreen = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible] as const;
};
