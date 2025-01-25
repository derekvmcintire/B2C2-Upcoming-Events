import React, { createContext, ReactNode, useContext } from "react";

/**
 * Type definition for the Features Context.
 * Describes the shape of the state and its associated setters for event-related data.
 */
interface FeatureContextType {
  [key: string]: boolean; // Dynamic feature flags
}

/**
 * Default values for the Features Context.
 * Used to initialize the context and provide default implementations for setters.
 */
const defaultFeatureContext: FeatureContextType = {};

/**
 * The actual Features Context object.
 * This will be provided to components that need access to event-related state.
 */
const FeatureContext = createContext<FeatureContextType>(defaultFeatureContext);

/**
 * Props for the `FeatureProvider` component.
 * Allows optional initialization of context state with preloaded data.
 */
interface FeatureProviderProps {
  children: ReactNode; // React children to be rendered inside the provider
}

/**
 * FeatureProvider Component
 *
 * A context provider for managing event-related state. Wraps its children
 * with the `FeatureContext.Provider` and provides state management logic.
 */
export const FeatureProvider: React.FC<FeatureProviderProps> = ({
  children,
}) => {
  const featureFlags: FeatureContextType = {
    eventDescriptionFeature:
      process.env.REACT_APP_EVENT_DESCRIPTION_FEATURE === "true",
  };

  return (
    <FeatureContext.Provider value={featureFlags}>
      {children}
    </FeatureContext.Provider>
  );
};

/**
 * useFeatureContext Hook
 *
 * A custom hook to access the `FeatureContext`.
 * Ensures that the hook is used only within a valid provider.
 */
export const useFeatureContext = (): FeatureContextType => {
  const context = useContext(FeatureContext);

  // Throw an error if the hook is used outside of the provider
  if (!context) {
    throw new Error("useFeatureContext must be used within an FeatureProvider");
  }

  return context;
};
