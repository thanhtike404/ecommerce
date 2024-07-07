// components/CartItem.js
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartItem({ cartId, quantity }: { cartId: number; quantity: number }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`/api/v1/cart/${cartId}`, {
          params: {
            quantity: quantity,
          },
        });
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching cart item:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [cartId, quantity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Error loading item</div>;
  }

  return (
    <div className="flex items-center gap-4 my-4 p-4 border-b border-gray-200">
      <img
        src={item?.product?.imageUrl}
        alt={item?.name}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <h5 className="text-sm font-medium text-gray-800">
          {item?.product?.name}
        </h5>
        <p className="text-xs text-gray-500">Quantity: {quantity}</p>
        <p className="text-xs text-gray-500">
          Price: ${item?.price * quantity}
        </p>
      </div>
      test
    </div>
  );
}

export default CartItem;
