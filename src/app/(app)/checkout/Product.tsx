'use client';
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useCartStore from '@/store/home/cartStore';
import Image from 'next/image';
function Product({ stockId, quantity }: { stockId: number; quantity: number }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const { data, isLoading } = useQuery({
    queryKey: ['product', { stockId }],
    queryFn: async () => {
      const product = await axios
        .get(`/api/v1/cart/${stockId}`)
        .then((res) => res.data);
      return product;
    },
  });

  return (
    <div>
      {data && (
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center space-x-4">
            <Image
              src={data?.product?.imageUrl}
              alt="Product 1"
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <div className="font-medium">{data?.product.name}</div>

              <div className="font-medium">Price:{data?.price}</div>
              <div className="font-medium">Size:{data?.size}</div>

              <div className="text-sm text-gray-500">Quantity {quantity}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="font-medium">${data?.price * quantity}</div>
            <button
              className="text-red-500"
              onClick={() => {
                removeItem(stockId);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
