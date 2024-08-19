import React, { useState, useEffect } from 'react';
import './App.css';
import Profile from './components/Profile';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </button>
      <Profile />
    </div>
  );
}

export default App;
