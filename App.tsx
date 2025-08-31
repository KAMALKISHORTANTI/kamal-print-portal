import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NewOrderPage from './pages/NewOrderPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EServicesPage from './pages/EServicesPage';
import { Page } from './types';

const PageRenderer: React.FC = () => {
    const { currentPage, user } = useApp();

    if (currentPage === Page.AUTH) {
        return <AuthPage />;
    }
    if (currentPage === Page.NEW_ORDER) {
        return <NewOrderPage />;
    }
    if (currentPage === Page.DASHBOARD) {
        return <DashboardPage />;
    }
    if (currentPage === Page.ADMIN_DASHBOARD && user?.isAdmin) {
        return <AdminDashboardPage />;
    }
    if (currentPage === Page.E_SERVICES) {
        return <EServicesPage />;
    }
    
    return <HomePage />;
};


const App: React.FC = () => {
  return (
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  );
};

const ThemedApp: React.FC = () => {
  const { theme } = useApp();
  
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageRenderer />
      </main>
      <Footer />
    </div>
  );
};


export default App;