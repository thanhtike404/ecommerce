'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Trash } from 'lucide-react';

import React from 'react';
import useCartStore from '@/store/home/cartStore';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartItem from './cartItem';
import Link from 'next/link';

function CartSlider() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const itemCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const clearcartHandler = () => {
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <AiOutlineShoppingCart className="h-8 w-8 text-gray-700" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -mt-2 -mr-2">
              {itemCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <div>
        <SheetContent className="h-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold">Your Cart</SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
              Review your cart items. You can remove items or proceed to
              checkout.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              <div>
                {cart.map((item: any) => (
                  <CartItem
                    key={item.id}
                    stockId={item.stockId}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="mt-4 space-y-3 ">
              <button
                className="bg-red-500 text-white px-4 w-full py-2 rounded transition"
                onClick={clearcartHandler}
              >
                Clear Cart
                <Trash className="h-4 w-4 inline-block ml-2" />
              </button>
              <button className="bg-blue-500 text-white px-4 w-full py-2 rounded transition">
                <Link href="/checkout">Proceed to Checkout</Link>
              </button>

              <br />
            </div>
          )}
        </SheetContent>
      </div>
    </Sheet>
  );
}

export default CartSlider;
