import { createContext, useContext, useMemo, useState } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => {
    setLoadingCount((count) => count + 1);
  };

  const stopLoading = () => {
    setLoadingCount((count) => Math.max(0, count - 1));
  };

  const setLoading = (isLoading) => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  };

  const value = useMemo(() => {
    return {
      loading: loadingCount > 0,
      loadingCount,
      startLoading,
      stopLoading,
      setLoading,
    };
  }, [loadingCount]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
}