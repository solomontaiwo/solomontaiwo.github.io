import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // default fallback

  // Funzione per rilevare la lingua di sistema
  const detectSystemLanguage = () => {
    const languages = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'])
      .map((lang) => (lang || '').split('-')[0].toLowerCase());
    const supported = ['en', 'it'];
    const match = languages.find((lang) => supported.includes(lang));
    return match || 'en';
  };

  useEffect(() => {
    // Rileva automaticamente la lingua di sistema e rimuovi vecchie preferenze manuali
    localStorage.removeItem('portfolio-language');
    const systemLanguage = detectSystemLanguage();
    setLanguage(systemLanguage);
  }, []);

  // Effetto per aggiornare lang e title quando la lingua cambia
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Aggiorna anche il titolo del documento
    const title = language === 'it' ? 'Solomon Taiwo - Portfolio' : 'Solomon Taiwo - Portfolio';
    document.title = title;
  }, [language]);

  const value = {
    language
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 
