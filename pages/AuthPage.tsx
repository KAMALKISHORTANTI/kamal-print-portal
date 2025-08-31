import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockLogin } from '../services/mockApiService';

const AuthPage: React.FC = () => {
    const { login } = useApp();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = await mockLogin(email);
            if (user) {
                login(user);
            } else {
                setError('Invalid credentials. Try "user@example.com" or "admin@example.com".');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                           This is a mock login. No password needed.
                        </p>
                    </div>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    placeholder="user@example.com"
                                />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                     <div className="text-sm text-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
                        <p className="font-semibold">Demo Credentials:</p>
                        <p>User: <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">user@example.com</code></p>
                        <p>Admin: <code className="bg-slate-200 dark:bg-slate-600 px-1 rounded">admin@example.com</code></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;