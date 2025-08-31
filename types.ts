
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Page {
  HOME = 'HOME',
  AUTH = 'AUTH',
  NEW_ORDER = 'NEW_ORDER',
  DASHBOARD = 'DASHBOARD',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  E_SERVICES = 'E_SERVICES',
}

export enum PrintType {
  BLACK_AND_WHITE = 'Black & White',
  COLOR = 'Color',
}

export enum PrintSize {
  A4 = 'A4',
  A5 = 'A5',
  PVC_CARD = 'PVC Card',
}

export enum DeliveryOption {
  SELF_PICKUP = 'Self-Pickup',
  COURIER = 'Courier Delivery',
  DIGITAL_DOWNLOAD = 'Digital Download',
}

export enum OrderStatus {
  PENDING = 'Pending',
  PRINTED = 'Printed',
  DISPATCHED = 'Dispatched',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface User {
  id: string;
  email: string;
  mobile: string;
  isAdmin: boolean;
}

export interface UploadedFile {
  id: string;
  file: File;
  printType: PrintType;
  printSize: PrintSize;
  quantity: number;
}

export interface PrintOrder {
  id: string;
  userId: string;
  // FIX: Wrapped the intersection type in parentheses to ensure it's an array of objects with the combined properties.
  files: (Omit<UploadedFile, 'file'> & { fileName: string; fileSize: number })[];
  deliveryOption: DeliveryOption;
  totalCost: number;
  orderDate: string;
  status: OrderStatus;
  shippingAddress?: string;
}

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}