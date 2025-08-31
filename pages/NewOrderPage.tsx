import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Page, UploadedFile, PrintType, PrintSize, DeliveryOption } from '../types';
import { placeOrder } from '../services/mockApiService';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const prices = {
  [PrintSize.A4]: { [PrintType.BLACK_AND_WHITE]: 2, [PrintType.COLOR]: 10 },
  [PrintSize.A5]: { [PrintType.BLACK_AND_WHITE]: 1, [PrintType.COLOR]: 5 },
  [PrintSize.PVC_CARD]: { [PrintType.BLACK_AND_WHITE]: 50, [PrintType.COLOR]: 100 },
};
const deliveryCosts = {
    [DeliveryOption.SELF_PICKUP]: 0,
    [DeliveryOption.COURIER]: 50,
    [DeliveryOption.DIGITAL_DOWNLOAD]: 0,
};

const FileUploadStep: React.FC<{ onFilesChange: (files: UploadedFile[]) => void, uploadedFiles: UploadedFile[] }> = ({ onFilesChange, uploadedFiles }) => {
    const [error, setError] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const files = Array.from(event.target.files || []);
        const newUploadedFiles: UploadedFile[] = [...uploadedFiles];
        let hasError = false;

        files.forEach(file => {
            if (file.size > MAX_FILE_SIZE) {
                setError(`File "${file.name}" is too large (max 5MB).`);
                hasError = true;
                return;
            }
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                setError(`File type for "${file.name}" is not supported.`);
                hasError = true;
                return;
            }
            if(!uploadedFiles.find(f => f.file.name === file.name)) {
                newUploadedFiles.push({
                    id: `${file.name}-${Date.now()}`,
                    file: file,
                    printType: PrintType.BLACK_AND_WHITE,
                    printSize: PrintSize.A4,
                    quantity: 1,
                });
            }
        });

        if (!hasError) {
            onFilesChange(newUploadedFiles);
        }
    };

    const removeFile = (id: string) => {
        onFilesChange(uploadedFiles.filter(f => f.id !== id));
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Step 1: Upload Your Documents</h2>
            <div className="mt-4 p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-cyan-600 dark:text-cyan-400">
                        Click to upload or drag and drop
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG up to 5MB</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                </label>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            <div className="mt-6 space-y-4">
                {uploadedFiles.map((uf) => (
                    <div key={uf.id} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <p className="text-sm font-medium truncate">{uf.file.name}</p>
                        <button onClick={() => removeFile(uf.id)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OptionsStep: React.FC<{ files: UploadedFile[], onFileUpdate: (updatedFile: UploadedFile) => void }> = ({ files, onFileUpdate }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Step 2: Customize Print Options</h2>
        <div className="space-y-6">
            {files.map(file => (
                <div key={file.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                    <h3 className="font-semibold mb-3 truncate">{file.file.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Print Type</label>
                            <select value={file.printType} onChange={(e) => onFileUpdate({...file, printType: e.target.value as PrintType})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600">
                                {Object.values(PrintType).map(pt => <option key={pt} value={pt}>{pt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Print Size</label>
                            <select value={file.printSize} onChange={(e) => onFileUpdate({...file, printSize: e.target.value as PrintSize})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600">
                                {Object.values(PrintSize).map(ps => <option key={ps} value={ps}>{ps}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Quantity</label>
                            <input type="number" min="1" value={file.quantity} onChange={(e) => onFileUpdate({...file, quantity: parseInt(e.target.value, 10) || 1})} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DeliveryStep: React.FC<{ delivery: DeliveryOption, onDeliveryChange: (d: DeliveryOption) => void, address: string, onAddressChange: (a: string) => void }> = ({ delivery, onDeliveryChange, address, onAddressChange }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Step 3: Delivery Options</h2>
        <div className="space-y-4">
            {Object.values(DeliveryOption).map(option => (
                <label key={option} className={`flex items-center p-4 border rounded-lg cursor-pointer ${delivery === option ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-slate-300 dark:border-slate-600'}`}>
                    <input type="radio" name="delivery" value={option} checked={delivery === option} onChange={() => onDeliveryChange(option)} className="h-4 w-4 text-cyan-600 border-slate-300 focus:ring-cyan-500" />
                    <span className="ml-3 block text-sm font-medium">{option}</span>
                </label>
            ))}
        </div>
        {delivery === DeliveryOption.COURIER && (
            <div className="mt-6">
                <label className="block text-sm font-medium">Shipping Address</label>
                <textarea value={address} onChange={(e) => onAddressChange(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" placeholder="123 Main St, Anytown, USA 12345"></textarea>
            </div>
        )}
    </div>
);

const ReviewStep: React.FC<{ files: UploadedFile[], delivery: DeliveryOption, totalCost: number, printCost: number, deliveryCost: number }> = ({ files, delivery, totalCost, printCost, deliveryCost }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Step 4: Review and Pay</h2>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:border-slate-600">Order Summary</h3>
            <div className="space-y-3 mb-4">
                {files.map(file => {
                    const cost = (prices[file.printSize]?.[file.printType] || 0) * file.quantity;
                    return (
                        <div key={file.id} className="flex justify-between items-center text-sm">
                            <span className="truncate pr-4">{file.file.name} ({file.quantity}x {file.printType}, {file.printSize})</span>
                            <span className="font-medium">₹{cost.toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>
            <div className="border-t pt-4 dark:border-slate-600 space-y-2">
                 <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{printCost.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span>Delivery ({delivery})</span>
                    <span>₹{deliveryCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalCost.toFixed(2)}</span>
                </div>
            </div>
        </div>
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="p-6 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                <p className="font-semibold">Mock Payment Gateway</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Click "Place Order" to simulate a successful payment.</p>
            </div>
        </div>
    </div>
);


const NewOrderPage: React.FC = () => {
    const { user, setCurrentPage } = useApp();
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [delivery, setDelivery] = useState<DeliveryOption>(DeliveryOption.SELF_PICKUP);
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) {
        return (
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Please Login First</h2>
                <p className="mb-6">You need to be logged in to place a new order.</p>
                <button onClick={() => setCurrentPage(Page.AUTH)} className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-md font-medium hover:from-teal-500 hover:to-cyan-600">
                    Login / Sign Up
                </button>
            </div>
        );
    }

    const handleFileUpdate = (updatedFile: UploadedFile) => {
        setFiles(files.map(f => f.id === updatedFile.id ? updatedFile : f));
    };

    const printCost = useMemo(() =>
        files.reduce((total, file) => total + (prices[file.printSize]?.[file.printType] || 0) * file.quantity, 0),
        [files]
    );

    const deliveryCost = useMemo(() => deliveryCosts[delivery] || 0, [delivery]);
    const totalCost = printCost + deliveryCost;

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const canProceedToNext = () => {
        if (step === 1 && files.length === 0) return false;
        if (step === 3 && delivery === DeliveryOption.COURIER && !address.trim()) return false;
        return true;
    }

    const handleSubmitOrder = async () => {
        setIsSubmitting(true);
        const orderData = {
            userId: user.id,
            files: files.map(f => ({
                id: f.id,
                fileName: f.file.name,
                fileSize: f.file.size,
                printType: f.printType,
                printSize: f.printSize,
                quantity: f.quantity,
            })),
            deliveryOption: delivery,
            totalCost,
            shippingAddress: delivery === DeliveryOption.COURIER ? address : undefined,
        };

        try {
            await placeOrder(orderData);
            alert('Order placed successfully!');
            setCurrentPage(Page.DASHBOARD);
        } catch (error) {
            alert('Failed to place order.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <div className="mb-8">
                {/* Stepper */}
                <ol className="flex items-center w-full">
                    {['Upload', 'Options', 'Delivery', 'Review'].map((name, index) => (
                        <li key={name} className={`flex w-full items-center ${index < 3 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-slate-300 dark:after:border-slate-600 after:border-4 after:inline-block" : ""}`}>
                            <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${step > index + 1 ? 'bg-teal-500' : step === index + 1 ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                {step > index + 1 ?
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> :
                                    <span className={`font-bold ${step === index + 1 ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>{index + 1}</span>
                                }
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="min-h-[300px]">
                {step === 1 && <FileUploadStep onFilesChange={setFiles} uploadedFiles={files} />}
                {step === 2 && <OptionsStep files={files} onFileUpdate={handleFileUpdate} />}
                {step === 3 && <DeliveryStep delivery={delivery} onDeliveryChange={setDelivery} address={address} onAddressChange={setAddress} />}
                {step === 4 && <ReviewStep files={files} delivery={delivery} totalCost={totalCost} printCost={printCost} deliveryCost={deliveryCost} />}
            </div>

            <div className="mt-8 pt-5 border-t dark:border-slate-700 flex justify-between">
                <button onClick={prevStep} disabled={step === 1} className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50">
                    Back
                </button>
                {step < 4 ? (
                    <button onClick={nextStep} disabled={!canProceedToNext()} className="px-6 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-md text-sm font-medium hover:from-teal-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                ) : (
                    <button onClick={handleSubmitOrder} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                        {isSubmitting ? 'Placing Order...' : 'Place Order & Pay'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NewOrderPage;