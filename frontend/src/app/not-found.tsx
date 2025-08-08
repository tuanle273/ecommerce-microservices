'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] gap-6">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-2xl">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
