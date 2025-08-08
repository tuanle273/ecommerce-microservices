'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '@/lib/api/axios';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session) {
      toast.error('Please sign in to checkout');
      router.push('/login');
      return;
    }

    try {
      await api.post('/api/order', {
        orderLineItemsDtoList: items.map((item) => ({
          skuCode: item.skuCode,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      clearCart();
      toast.success('Order placed successfully');
      router.push('/orders');
    } catch (_error) {
      toast.error('Failed to place order');
    }
  };

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-600 mt-2">Add some products to your cart</p>
        <Button onClick={() => router.push('/products')} className="mt-4">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.skuCode}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.skuCode, Math.max(1, item.quantity - 1))
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.skuCode, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeItem(item.skuCode)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end gap-4 pt-4 border-t">
        <div className="text-right">
          <p className="text-gray-600">Total:</p>
          <p className="text-2xl font-bold">{formatPrice(total)}</p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
