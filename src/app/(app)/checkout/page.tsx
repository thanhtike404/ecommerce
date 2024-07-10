'use client';
import React from 'react';
import useCartStore from '@/store/home/cartStore';
import { useMutation } from '@tanstack/react-query';
import Product from './Product';
import { useSession } from 'next-auth/react';
import TotalPrice from './totalPrice';
import axios from 'axios';

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const { data: session } = useSession();

  const orderMutation = useMutation({
    mutationKey: ['order'],
    mutationFn: async (item) => {
      const response = await axios.post('/api/v1/order', item);
      console.log(response.data);
      return response.data;
    },
  });

  const orderHandler = () => {
    try {
      cart.forEach((item) => {
        item.email = session?.user?.email;
        orderMutation.mutate(item);
      });
      alert('Order placed successfully');
    } catch (error) {
      alert('error ordering: ', error.message);
    }
  };

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto mt-24 p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-grow">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">PRODUCT</h2>
            {cart?.map((item) => (
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
              <TotalPrice />
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
            <button
              className="bg-blue-500 text-white px-4 py-2 w-full rounded transition hover:bg-blue-600"
              onClick={orderHandler}
            >
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
