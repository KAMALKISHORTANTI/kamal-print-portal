
import { PrintOrder, OrderStatus, PrintType, PrintSize, DeliveryOption, User } from '../types';

let mockOrders: PrintOrder[] = [
    {
        id: 'ORD-001', userId: 'user1',
        files: [{ id: 'f1', fileName: 'Aadhaar.pdf', fileSize: 102400, printType: PrintType.BLACK_AND_WHITE, printSize: PrintSize.A4, quantity: 2 }],
        deliveryOption: DeliveryOption.SELF_PICKUP, totalCost: 20, orderDate: '2023-10-26T10:00:00Z', status: OrderStatus.DELIVERED
    },
    {
        id: 'ORD-002', userId: 'user1',
        files: [{ id: 'f2', fileName: 'PAN-Card.jpg', fileSize: 204800, printType: PrintType.COLOR, printSize: PrintSize.PVC_CARD, quantity: 1 }],
        deliveryOption: DeliveryOption.COURIER, totalCost: 150, orderDate: '2023-10-27T11:30:00Z', status: OrderStatus.DISPATCHED
    },
    {
        id: 'ORD-003', userId: 'user2',
        files: [
            { id: 'f3', fileName: 'VoterID.png', fileSize: 153600, printType: PrintType.COLOR, printSize: PrintSize.PVC_CARD, quantity: 1 },
            { id: 'f4', fileName: 'RationCard.pdf', fileSize: 307200, printType: PrintType.BLACK_AND_WHITE, printSize: PrintSize.A4, quantity: 5 }
        ],
        deliveryOption: DeliveryOption.COURIER, totalCost: 250, orderDate: '2023-10-28T09:00:00Z', status: OrderStatus.PRINTED
    },
    {
        id: 'ORD-004', userId: 'user1',
        files: [{ id: 'f5', fileName: 'University-Notes.pdf', fileSize: 4096000, printType: PrintType.BLACK_AND_WHITE, printSize: PrintSize.A5, quantity: 50 }],
        deliveryOption: DeliveryOption.SELF_PICKUP, totalCost: 500, orderDate: '2023-10-29T14:00:00Z', status: OrderStatus.PENDING
    },
];

const mockUsers: { [key: string]: User } = {
    'user@example.com': { id: 'user1', email: 'user@example.com', mobile: '1234567890', isAdmin: false },
    'admin@example.com': { id: 'admin1', email: 'admin@example.com', mobile: '0987654321', isAdmin: true },
};

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

export const mockLogin = (email: string): Promise<User | null> => {
    const user = mockUsers[email];
    return simulateDelay(user || null);
}

export const getOrdersForUser = (userId: string): Promise<PrintOrder[]> => {
    const orders = mockOrders.filter(o => o.userId === userId);
    return simulateDelay(orders);
}

export const getAllOrders = (): Promise<PrintOrder[]> => {
    return simulateDelay(mockOrders);
}

export const updateOrderStatus = (orderId: string, status: OrderStatus): Promise<PrintOrder | null> => {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        mockOrders[orderIndex].status = status;
        return simulateDelay(mockOrders[orderIndex]);
    }
    return simulateDelay(null);
}

export const placeOrder = (orderData: Omit<PrintOrder, 'id' | 'orderDate' | 'status'>): Promise<PrintOrder> => {
    const newOrder: PrintOrder = {
        ...orderData,
        id: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
        orderDate: new Date().toISOString(),
        status: OrderStatus.PENDING,
    };
    mockOrders.push(newOrder);
    return simulateDelay(newOrder);
}
