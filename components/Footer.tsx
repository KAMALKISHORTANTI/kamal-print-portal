import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    &copy; {new Date().getFullYear()} Print Portal Pro. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;