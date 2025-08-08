export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderLineItem {
  id: string;
  skuCode: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderLineItems: OrderLineItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  skuCode: string;
  quantity: number;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}
