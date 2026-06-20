"use client";

import { createContext, useContext } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ lang, messages, children }) {
  return (
    <LanguageContext.Provider value={{ lang, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
}

export function useMessages() {
  return useLanguage().messages;
}

export function useLang() {
  return useLanguage().lang;
}
