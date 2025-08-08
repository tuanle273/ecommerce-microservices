'use client';

import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] gap-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Micro Marketplace
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-2xl">
        A modern e-commerce platform built with microservices architecture,
        featuring real-time inventory tracking and seamless order processing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <ShoppingBag className="h-12 w-12" />
          <h2 className="text-xl font-semibold">Browse Products</h2>
          <p className="text-center text-gray-600">
            Explore our wide range of products with detailed information
          </p>
          <Link href="/products">
            <Button>Shop Now</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <Package className="h-12 w-12" />
          <h2 className="text-xl font-semibold">Track Orders</h2>
          <p className="text-center text-gray-600">
            View and manage your orders with real-time updates
          </p>
          <Link href="/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <Truck className="h-12 w-12" />
          <h2 className="text-xl font-semibold">Fast Delivery</h2>
          <p className="text-center text-gray-600">
            Get your orders delivered quickly and efficiently
          </p>
          <Button variant="secondary" disabled>
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
}