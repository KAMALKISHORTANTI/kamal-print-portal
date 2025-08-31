import React from 'react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';
import { Page } from '../types';

const Header: React.FC = () => {
    const { user, logout, setCurrentPage, currentPage } = useApp();

    const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => {
        const isActive = currentPage === page;
        return (
            <button
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                        ? 'text-cyan-500'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
                {children}
            </button>
        );
    };

    return (
        <header className="bg-white/80 dark:bg-slate-800/80 shadow-md sticky top-0 z-50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => setCurrentPage(Page.HOME)} className="flex-shrink-0 flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 2v2h6V6H7zm-4 4a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6zm3 4h8v-2H6v2zm-1-4h10V9H5v1z" />
                            </svg>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">PrintPro</span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex items-center space-x-2">
                           <NavLink page={Page.HOME}>Home</NavLink>
                           <NavLink page={Page.NEW_ORDER}>Print Order</NavLink>
                           {user && <NavLink page={Page.E_SERVICES}>e-Services</NavLink>}
                           {user && <NavLink page={Page.DASHBOARD}>Dashboard</NavLink>}
                           {user && user.isAdmin && <NavLink page={Page.ADMIN_DASHBOARD}>Admin</NavLink>}
                        </nav>
                        <div className="flex items-center space-x-3">
                           {user ? (
                                <button
                                    onClick={logout}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                >
                                    Logout
                                </button>
                           ) : (
                                <button
                                    onClick={() => setCurrentPage(Page.AUTH)}
                                    className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-teal-500 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
                                >
                                    Login / Sign Up
                                </button>
                           )}
                           <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;