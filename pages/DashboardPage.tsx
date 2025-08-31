import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PrintOrder, OrderStatus, Page } from '../types';
import { getOrdersForUser } from '../services/mockApiService';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING: return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
        case OrderStatus.PRINTED: return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300';
        case OrderStatus.DISPATCHED: return 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300';
        case OrderStatus.DELIVERED: return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
        case OrderStatus.CANCELLED: return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';
        default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
};

const OrderRow: React.FC<{ order: PrintOrder }> = ({ order }) => (
    <tr className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{order.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(order.orderDate).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{order.files.length}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">₹{order.totalCost.toFixed(2)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
        </td>
    </tr>
);


const DashboardPage: React.FC = () => {
    const { user, setCurrentPage } = useApp();
    const [orders, setOrders] = useState<PrintOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getOrdersForUser(user.id)
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                });
        }
    }, [user]);

    if (!user) {
        return <div className="text-center">Please login to view your dashboard.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
                <button onClick={() => setCurrentPage(Page.NEW_ORDER)} className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-md font-medium hover:from-teal-500 hover:to-cyan-600 shadow-md">
                    Place New Order
                </button>
            </div>
            
            {loading ? (
                <p>Loading your orders...</p>
            ) : orders.length === 0 ? (
                <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">No orders yet!</h2>
                    <p className="text-slate-600 dark:text-slate-400">You haven't placed any print orders. Let's get started.</p>
                </div>
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Items</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Total</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {orders.map(order => <OrderRow key={order.id} order={order} />)}
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

export default DashboardPage;