'use client';
import React from 'react';
import useCartStore, { Product } from '@/store/home/cartStore';

function AddToCart({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart); // Get the addToCart function

  const handleAddToCart = () => {
    console.log(product);
    addToCart({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
        <button
          className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button className="bg-transparent text-gray-800 py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AddToCart;
