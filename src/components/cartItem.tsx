// components/CartItem.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import useCartStore from '@/store/home/cartStore';

function CartItem({
  stockId,
  quantity,
}: {
  stockId: number;
  quantity: number;
}) {
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const [newQuantity, setQuantity] = useState(quantity);

  const { data: item, isLoading } = useQuery({
    queryKey: ['cartItem', stockId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/cart/${stockId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching cart item:', error);
      }
    },
    staleTime: 1000 * 60 * 5, // Cache the result for 5 minutes

    refetchOnWindowFocus: false, // Only refetch when the window is not in focus
  });

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  const incHandler = () => {
    setQuantity(newQuantity + 1);
    increment(stockId);
  };

  const decHandler = () => {
    if (newQuantity > 1) {
      setQuantity(newQuantity - 1);
      decrement(stockId);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center gap-4 my-4 p-4 border-b border-gray-200 bg-white shadow-md rounded-lg">
      <Image
        height={500}
        width={500}
        src={item?.product?.imageUrl}
        alt={item?.product?.name}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <h5 className="text-sm font-medium text-gray-800">
          {item?.product?.name}
        </h5>

        <div className="flex items-center mt-2">
          <button
            onClick={decHandler}
            className="bg-gray-900 text-white px-2 rounded-l-sm rounded-r-none"
          >
            -
          </button>
          <input
            className="w-12 text-center border border-gray-300"
            value={newQuantity}
            type="text"
            readOnly
          />
          <button
            onClick={incHandler}
            className="bg-gray-900 text-white px-2 rounded-l-none rounded-r-sm"
          >
            +
          </button>
        </div>
        <p className="text-xs text-gray-900 mt-2">Quantity: {newQuantity}</p>
        <p className="text-xs text-gray-900">
          Price: ${(item?.price * newQuantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartItem;
