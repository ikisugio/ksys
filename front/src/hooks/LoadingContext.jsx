import React, { createContext, useState, useContext } from "react";

// Create a new context
const LoadingContext = createContext();

// Create a provider that holds the state
export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoadingContext.Provider>
  );
}

// Create a hook for easy access to the context
export function useLoading() {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
}
