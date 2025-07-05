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
  const [language, setLanguage] = useState('it'); // default italiano

  // Funzione per rilevare la lingua di sistema
  const detectSystemLanguage = () => {
    // Prova con navigator.language prima, poi con navigator.languages
    const browserLanguage = navigator.language || navigator.languages[0] || 'it';
    
    // Estrai solo il codice lingua (es: 'en-US' -> 'en')
    const languageCode = browserLanguage.split('-')[0].toLowerCase();
    
    // Supporta solo italiano e inglese
    return languageCode === 'en' ? 'en' : 'it';
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    
    if (savedLanguage) {
      // Se c'è una lingua salvata, usala
      setLanguage(savedLanguage);
    } else {
      // Altrimenti rileva automaticamente la lingua di sistema
      const systemLanguage = detectSystemLanguage();
      setLanguage(systemLanguage);
      // Salva la scelta automatica per future visite
      localStorage.setItem('portfolio-language', systemLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'it' ? 'en' : 'it';
    setLanguage(newLanguage);
    localStorage.setItem('portfolio-language', newLanguage);
    
    // Aggiorna l'attributo lang del documento per accessibilità
    document.documentElement.lang = newLanguage;
  };
  
  // Effetto per aggiornare lang e title quando la lingua cambia
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Aggiorna anche il titolo del documento
    const title = language === 'it' ? 'Solomon Taiwo - Portfolio' : 'Solomon Taiwo - Portfolio';
    document.title = title;
  }, [language]);

  const value = {
    language,
    toggleLanguage,
    isItalian: language === 'it',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 