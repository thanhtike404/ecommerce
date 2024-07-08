'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React from 'react';
import useCartStore from '@/store/home/cartStore';
import { Product } from '@/store/home/cartStore';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartItem from './cartItem';
function CartSlider() {
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Your Cart</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Review your cart items. You can remove items or proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
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
          <div className="mt-4 flex justify-end">
            <button className="bg-gray-500 text-white px-4 w-full py-2 rounded  transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartSlider;
