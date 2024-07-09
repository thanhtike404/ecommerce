'use client';
import React from 'react';
import useCartStore from '@/store/home/cartStore';
import { useQuery } from '@tanstack/react-query';

const fetchProductDetails = async (stockId: Number) => {
  const response = await fetch(`/api/v1/cart/${stockId}`);
  const data = await response.json();
  return data;
};

const calculateTotalPrice = async (cart: any) => {
  const total = await cart.reduce(async (accPromise, item) => {
    const acc = await accPromise;
    const product = await fetchProductDetails(item.stockId);
    return acc + product.price * item.quantity;
  }, Promise.resolve(0));
  return total;
};

function TotalPrice() {
  const cart = useCartStore((state) => state.cart);

  const { data: totalPrice, isLoading } = useQuery({
    queryKey: ['totalPrice', { cart }],
    queryFn: () => calculateTotalPrice(cart),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Total Price: USD {totalPrice?.toFixed(2)}</div>;
}

export default TotalPrice;
