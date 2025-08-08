'use client';

import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/store/cart';

export default function Header() {
  const { data: session } = useSession();
  const { items } = useCartStore();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Micro Marketplace
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/products" className="hover:text-gray-600">
            Products
          </Link>
          <Link href="/orders" className="hover:text-gray-600">
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <User className="h-6 w-6" />
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => signIn('keycloak')}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
