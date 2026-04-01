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

const SUPPORTED_LANGUAGES = ["en", "it"];

const getSavedLanguage = () => {
  try {
    const saved = typeof window !== "undefined" && window.localStorage
      ? window.localStorage.getItem("language")
      : null;
    if (saved && SUPPORTED_LANGUAGES.includes(saved.toLowerCase())) {
      return saved.toLowerCase();
    }
  } catch (e) {
    // Ignore storage access errors and fall back to system language
  }
  return detectSystemLanguage();
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getSavedLanguage);

  const setLanguage = (lang) => {
    const normalized = (lang || "").toLowerCase();
    if (!SUPPORTED_LANGUAGES.includes(normalized)) {
      return;
    }
    setLanguageState(normalized);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("language", normalized);
      }
    } catch (e) {
      // Ignore storage access errors; language state is already updated
    }
  };

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = language;
    document.title = "Solomon Taiwo | Software Engineer Portfolio";
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};
