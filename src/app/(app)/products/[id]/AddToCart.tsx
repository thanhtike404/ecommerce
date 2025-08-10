'use client';
import React, { useState, ChangeEvent } from 'react';
import useCartStore, { Product } from '@/store/home/cartStore';
import PriceAdjuster from './priceAdjuster';



function AddToCart({ stock }: {
  stock: {
    id: number;
    size: string | null;
    price: number;
    stock: number;
    sku: string;
  }[]
}) {
  console.log(stock, 'product in add to cart');
  const addToCart = useCartStore((state) => state.addToCart); // Get the addToCart function

  const [selectedItem, setSelectedItem] = useState(
    stock ? stock[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({
        stockId: selectedItem.id,
        quantity: quantity,
      });
    }
  };

  const stockHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = stock?.find(
      (item) => item.id === parseInt(e.target.value, 10)
    );
    setSelectedItem(selectedItem || null);
    if (selectedItem) {
      setQuantity(1);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="p-4 rounded-lg bg-white">
      {stock && (
        <select
          name="size"
          id="size"
          className="py-2 px-3 w-full rounded-md mb-3 bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={stockHandler}
        >
          {stock.map((item) => (
            <option key={item.id} value={item.id}>
              {item.size ?? 'N/A'}
            </option>
          ))}
        </select>
      )}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {selectedItem?.price ? `$${selectedItem?.price}` : 'Select Size'}
        </h2>
        {selectedItem && (
          <PriceAdjuster
            initialQuantity={quantity}
            maxStock={selectedItem.stock}
            onQuantityChange={handleQuantityChange}
          />
        )}
        <h2 className="text-gray-600">
          {selectedItem?.stock ? `${selectedItem.stock} in stock` : 'Stock'}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out w-full"
          onClick={handleAddToCart}
          disabled={!selectedItem}
        >
          Add to Cart
        </button>
        <button className="bg-transparent text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
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
