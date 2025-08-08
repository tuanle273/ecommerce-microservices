'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/axios';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

async function getOrders(): Promise<Order[]> {
  const response = await api.get('/api/order');
  return response.data;
}

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error loading orders</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">No orders found</h2>
        <p className="text-gray-600">Place an order to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                {format(new Date(order.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'DELIVERED'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'SHIPPED'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(order.totalAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
