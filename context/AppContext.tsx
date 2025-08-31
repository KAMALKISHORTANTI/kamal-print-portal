
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppContextType, Page, Theme, User } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || Theme.LIGHT;
    }
    return Theme.LIGHT;
  });
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const login = (userData: User) => {
    setUser(userData);
    setCurrentPage(userData.isAdmin ? Page.ADMIN_DASHBOARD : Page.DASHBOARD);
  };
  
  const logout = () => {
    setUser(null);
    setCurrentPage(Page.HOME);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    user,
    login,
    logout,
    currentPage,
    setCurrentPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
