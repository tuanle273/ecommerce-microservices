import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      skuCode: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    toast.success('Added to cart');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
        <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
