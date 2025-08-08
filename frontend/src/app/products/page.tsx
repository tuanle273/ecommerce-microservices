'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/axios';
import { Product } from '@/types';
import ProductGrid from '@/components/products/product-grid';
import { Skeleton } from '@/components/ui/skeleton';

async function getProducts(): Promise<Product[]> {
  const response = await api.get('/api/product');
  return response.data;
}

export default function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error loading products</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">No products found</h2>
        <p className="text-gray-600">Check back later for new products</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
