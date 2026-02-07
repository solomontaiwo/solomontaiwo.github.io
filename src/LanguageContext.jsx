import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const detectSystemLanguage = () => {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const rawLanguages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || "en"];

  const supported = ["en", "it"];
  const normalized = rawLanguages.map((lang) => (lang || "").split("-")[0].toLowerCase());
  const match = normalized.find((lang) => supported.includes(lang));

  return match || "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage(detectSystemLanguage());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = language;
    document.title = "Solomon Taiwo | Software Engineer Portfolio";
  }, [language]);

  return <LanguageContext.Provider value={{ language }}>{children}</LanguageContext.Provider>;
};
