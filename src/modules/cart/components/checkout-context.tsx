// LoadingContext.js
import React, { createContext, useState, useEffect } from "react";

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(() => {
    const savedLoadingState = localStorage.getItem("isLoading");
    return savedLoadingState ? JSON.parse(savedLoadingState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoading", JSON.stringify(isLoading));
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
