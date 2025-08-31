import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { PrintOrder, OrderStatus } from '../types';
import { getAllOrders, updateOrderStatus } from '../services/mockApiService';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING: return 'border-amber-500 text-amber-800 dark:text-amber-300';
        case OrderStatus.PRINTED: return 'border-sky-500 text-sky-800 dark:text-sky-300';
        case OrderStatus.DISPATCHED: return 'border-violet-500 text-violet-800 dark:text-violet-300';
        case OrderStatus.DELIVERED: return 'border-emerald-500 text-emerald-800 dark:text-emerald-300';
        case OrderStatus.CANCELLED: return 'border-rose-500 text-rose-800 dark:text-rose-300';
        default: return 'border-slate-500 text-slate-800 dark:text-slate-300';
    }
};

const AdminOrderRow: React.FC<{ order: PrintOrder, onStatusChange: (orderId: string, status: OrderStatus) => void }> = ({ order, onStatusChange }) => (
    <tr className="bg-white dark:bg-slate-800">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{order.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(order.orderDate).toLocaleString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{order.userId}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">₹{order.totalCost.toFixed(2)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <select
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                className={`w-full p-1.5 rounded-md text-xs border-2 bg-transparent ${getStatusColor(order.status)} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            >
                {Object.values(OrderStatus).map(status => (
                    <option key={status} value={status} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                        {status}
                    </option>
                ))}
            </select>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button className="text-cyan-600 hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-200">
                Download Docs
            </button>
        </td>
    </tr>
);

const AdminDashboardPage: React.FC = () => {
    const { user } = useApp();
    const [orders, setOrders] = useState<PrintOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        const data = await getAllOrders();
        setOrders(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user?.isAdmin) {
            fetchOrders();
        }
    }, [user, fetchOrders]);

    const handleStatusChange = async (orderId: string, status: OrderStatus) => {
        const originalOrders = [...orders];
        const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
        setOrders(updatedOrders);

        const result = await updateOrderStatus(orderId, status);
        if (!result) {
            alert('Failed to update status. Reverting.');
            setOrders(originalOrders);
        }
    };

    if (!user?.isAdmin) {
        return <div className="text-center">Access Denied.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            
            {loading ? (
                <p>Loading all orders...</p>
            ) : (
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-slate-200 dark:border-slate-700 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Order ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">User ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Total</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {orders.map(order => <AdminOrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;