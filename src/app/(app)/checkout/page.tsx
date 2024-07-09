'use client';
import React from 'react';
import Image from 'next/image';
import useCartStore from '@/store/home/cartStore';
import { useQuery } from '@tanstack/react-query';
import { it } from 'node:test';
import Product from './Product';

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  console.log(cart, 'cart');

  return (
    <div className="container mx-auto mt-24 p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-grow">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">PRODUCT</h2>
            {cart?.map((item) => (
              // <div
              //   className="flex items-center justify-between border-b pb-4 mb-4"
              //   key={item.stockId}
              // >
              //   {/* <div className="flex items-center space-x-4">
              //     <Image
              //       src="/path-to-image1.jpg"
              //       alt="Product 1"
              //       width={80}
              //       height={80}
              //       className="w-20 h-20 object-cover rounded-md"
              //     />
              //     <div>
              //       <div className="font-medium">
              //         Some name of item goes here nice
              //       </div>
              //       <div className="text-sm text-gray-500">
              //         Size: XL, Color: blue, Brand: Gucci
              //       </div>
              //     </div>
              //   </div>
              //   <div className="flex items-center space-x-4">
              //     <select className="border rounded px-3 py-2">
              //       <option value="1">1</option>
              //       <option value="2">2</option>
              //       <option value="3">3</option>
              //     </select>
              //     <div className="font-medium">$1156.00</div>
              //     <button className="text-red-500">Remove</button>
              //   </div> */}

              // </div>
              <Product
                quantity={item.quantity}
                stockId={item.stockId}
                key={item.stockId}
              />
            ))}

            <div className="text-center mt-6">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded transition hover:bg-gray-300">
                Continue shopping
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span>Total price:</span>
              <span>USD 568</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>USD 658</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>$1,650</span>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="coupon"
              className="block text-sm font-medium text-gray-700"
            >
              Have a coupon?
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                id="coupon"
                className="border rounded-l px-3 py-2 w-full"
                placeholder="Coupon code"
              />
              <button className="bg-blue-500 text-white px-4 rounded-r">
                Apply
              </button>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 w-full rounded transition hover:bg-blue-600">
              Make Purchase
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-100 text-green-700 p-4 rounded text-center">
        Free Delivery within 1-2 weeks
      </div>
    </div>
  );
};

export default CartPage;
