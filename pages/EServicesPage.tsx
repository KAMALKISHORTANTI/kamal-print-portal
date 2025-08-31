import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

type ServiceID =
    | 'PAN_MANUAL'
    | 'AADHAAR_ADVANCE'
    | 'LOST_PAN_FIND'
    | 'DRIVING_LICENSE'
    | 'AYUSHMAN_CARD'
    | 'RATION_CARD'
    | 'ESHRAM_CARD'
    | 'VOTER_ID'
    | 'AADHAAR_MANUAL';

const services: { id: ServiceID; title: string; price: string; imageSrc: string }[] = [
    { id: 'AADHAAR_MANUAL', title: 'Aadhar Manual Print', price: '10', imageSrc: 'https://placehold.co/300x200/dbeafe/3b82f6?text=Aadhaar+Manual' },
    { id: 'PAN_MANUAL', title: 'Pan Card Manual Print', price: '10', imageSrc: 'https://placehold.co/300x200/d1fae5/059669?text=PAN+Card' },
    { id: 'AADHAAR_ADVANCE', title: 'Aadhar Advance Print', price: '20', imageSrc: 'https://placehold.co/300x200/ccfbf1/0d9488?text=Aadhaar+Advance' },
    { id: 'LOST_PAN_FIND', title: 'Lost Pan Find', price: '20', imageSrc: 'https://placehold.co/300x200/e0e7ff/4f46e5?text=Lost+PAN' },
    { id: 'DRIVING_LICENSE', title: 'Driving Licence Print', price: '20', imageSrc: 'https://placehold.co/300x200/fee2e2/b91c1c?text=Driving+Licence' },
    { id: 'RATION_CARD', title: 'Ration Card Print', price: '20', imageSrc: 'https://placehold.co/300x200/fef3c7/d97706?text=Ration+Card' },
    { id: 'AYUSHMAN_CARD', title: 'Ayushman Card Print', price: '30', imageSrc: 'https://placehold.co/300x200/e9d5ff/7e22ce?text=Ayushman+Card' },
    { id: 'ESHRAM_CARD', title: 'E-Shram Card Print', price: '20', imageSrc: 'https://placehold.co/300x200/fae8ff/a21caf?text=E-Shram' },
    { id: 'VOTER_ID', title: 'Voter ID Print', price: '20', imageSrc: 'https://placehold.co/300x200/f0f9ff/0284c7?text=Voter+ID' },
];

const ServiceCard: React.FC<{ imageSrc: string; title: string; price: string; onClick: () => void }> = ({ imageSrc, title, price, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-center bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-cyan-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
    >
        <img src={imageSrc} alt={title} className="mx-auto h-28 w-full object-cover rounded-md mb-4" />
        <h3 className="font-semibold text-slate-800 dark:text-white truncate">{title}</h3>
        <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">₹{price}/-</p>
    </button>
);


const ServiceModal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void; }> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" aria-modal="true" role="dialog">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg m-4">
            <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" aria-label="Close">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const MockServiceForm: React.FC<{ serviceName: string; inputLabel: string; inputPlaceholder: string }> = ({ serviceName, inputLabel, inputPlaceholder }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const handleSubmit = () => {
        setLoading(true);
        setResult('');
        setTimeout(() => {
            setLoading(false);
            setResult(`${serviceName} processed successfully! (Mock)`);
        }, 1500);
    }
    return (
        <div className="space-y-4">
            <div className="p-3 text-sm text-amber-800 bg-amber-100 rounded-lg dark:bg-amber-900/50 dark:text-amber-300" role="alert">
              This is a demo. Functionality is for illustrative purposes only.
            </div>
            <div>
                <label htmlFor="service-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{inputLabel}</label>
                <input type="text" id="service-input" className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white dark:bg-slate-700" placeholder={inputPlaceholder} />
            </div>
            <button onClick={handleSubmit} disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 disabled:opacity-50 transition-all">
                {loading ? 'Processing...' : 'Submit'}
            </button>
            {result && <p className="mt-4 text-center text-green-600 dark:text-green-400">{result}</p>}
        </div>
    );
}

const EServicesPage: React.FC = () => {
    const { user, setCurrentPage } = useApp();
    const [activeService, setActiveService] = useState<ServiceID | null>(null);
    
    if (!user) {
        return (
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Access Restricted</h2>
                <p className="mb-6 text-slate-600 dark:text-slate-400">You need to be logged in to access e-Services.</p>
                <button onClick={() => setCurrentPage(Page.AUTH)} className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-md font-medium hover:from-teal-500 hover:to-cyan-600 shadow-md">
                    Login / Sign Up
                </button>
            </div>
        );
    }

    const currentService = services.find(s => s.id === activeService);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Digital e-Services</h1>
                <p className="mt-2 max-w-2xl mx-auto text-md text-slate-600 dark:text-slate-300">
                    Select a service below to get started. All services are processed digitally.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        onClick={() => setActiveService(service.id)}
                        title={service.title}
                        price={service.price}
                        imageSrc={service.imageSrc}
                    />
                ))}
            </div>
            
            {activeService && currentService && (
                <ServiceModal title={currentService.title} onClose={() => setActiveService(null)}>
                    <MockServiceForm 
                        serviceName={currentService.title} 
                        inputLabel="Enter Details"
                        inputPlaceholder="Required information"
                    />
                </ServiceModal>
            )}
        </div>
    );
};

export default EServicesPage;
