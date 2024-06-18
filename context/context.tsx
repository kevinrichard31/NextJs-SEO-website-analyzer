"use client";
import { createContext, useState, ReactNode } from 'react';

interface ThemeContextType {
    theme: string;
    connected: boolean;
    toggleTheme: () => void;
    setConnected: (value: boolean) => void;
  }
  const defaultContextValue: ThemeContextType = {
    theme: 'light',
    connected: false,
    toggleTheme: () => {},
    setConnected: () => {}
  };
  
  const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const [connected, setConnected] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, connected, toggleTheme, setConnected }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
