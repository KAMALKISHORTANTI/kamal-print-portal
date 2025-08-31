import React from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

const FeatureCard: React.FC<{ icon: JSX.Element, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/10 transform transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
    </div>
);

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border-2 border-cyan-500 rounded-full">
                    <span className="text-lg font-bold text-cyan-500">{number}</span>
                </div>
            </div>
            <div className="w-px h-full bg-cyan-500/30"></div>
        </div>
        <div className="pb-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    </div>
);


const HomePage: React.FC = () => {
    const { setCurrentPage } = useApp();

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="relative pt-16 pb-20 text-center lg:text-left overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 z-10">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600 tracking-tight leading-tight">
                                Effortless Printing, Instant Services.
                            </h1>
                            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-slate-600 dark:text-slate-300">
                                Your trusted partner for high-quality document printing and essential e-governance services, all in one place.
                            </p>
                            <div className="mt-8 flex justify-center lg:justify-start gap-4">
                                <button
                                    onClick={() => setCurrentPage(Page.NEW_ORDER)}
                                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow-lg transform hover:scale-105 transition-transform duration-300"
                                >
                                    Start a Print Order
                                </button>
                                <button
                                    onClick={() => setCurrentPage(Page.E_SERVICES)}
                                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200 dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600 shadow-lg transform hover:scale-105 transition-transform duration-300"
                                >
                                    Explore e-Services
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="relative mx-auto max-w-lg">
                                 <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
                                 <div className="absolute -bottom-16 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:2s] dark:opacity-30"></div>
                                 <div className="absolute -bottom-8 left-16 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:4s] dark:opacity-30"></div>
                                <img src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Digital Services" className="relative rounded-2xl shadow-2xl transform rotate-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section>
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose PrintPro?</h2>
                    <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                        We provide a seamless experience for all your printing and digital service needs.
                    </p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-12">
                    <FeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>}
                        title="Quality Prints"
                        description="Get crisp, professional prints every time. We use top-grade materials for all your documents."
                    />
                     <FeatureCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        title="Fast Turnaround"
                        description="Swift processing and multiple delivery options to get your prints when you need them."
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m-9 9a9 9 0 019-9" /></svg>}
                        title="All-in-One e-Services"
                        description="Access a wide range of government services without leaving home. Quick, simple, and secure."
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        title="Secure & Reliable"
                        description="Your data and documents are safe with us. We prioritize your privacy and security."
                    />
                 </div>
            </section>
            
            {/* How It Works Section */}
            <section className="max-w-4xl mx-auto">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Simple & Easy Process</h2>
                    <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                       Get your work done in three simple steps.
                    </p>
                 </div>
                 <div className="mt-12 flex justify-center">
                    <div className="max-w-sm">
                        <StepCard 
                            number="1"
                            title="Upload & Customize"
                            description="Select a service, upload your files, and choose your specifications with our easy-to-use interface."
                        />
                         <StepCard 
                            number="2"
                            title="Secure Checkout"
                            description="Review your order and complete the payment through our secure gateway."
                        />
                         <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border-2 border-cyan-500 rounded-full">
                                        <span className="text-lg font-bold text-cyan-500">3</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-8">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Track & Receive</h3>
                                <p className="text-slate-600 dark:text-slate-400">Track the status of your order in real-time and receive it via your chosen delivery method.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

             {/* Final CTA */}
            <section className="bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl py-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
                <p className="max-w-2xl mx-auto text-white/90 mb-8">
                    Join thousands of satisfied customers. Place your first order or use an e-service today!
                </p>
                 <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setCurrentPage(Page.NEW_ORDER)}
                        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-white hover:bg-slate-100 shadow-lg transform hover:scale-105 transition-transform duration-300"
                    >
                        Place an Order
                    </button>
                    <button
                        onClick={() => setCurrentPage(Page.E_SERVICES)}
                        className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-base font-medium rounded-md text-white bg-white/20 hover:bg-white/30 shadow-lg transform hover:scale-105 transition-transform duration-300"
                    >
                        Use e-Services
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;