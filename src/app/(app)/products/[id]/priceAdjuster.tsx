'use client';
import React, { useState } from 'react';

interface PriceAdjusterProps {
  initialQuantity: number;
  maxStock: number;
  onQuantityChange: (price: number) => void;
}

const PriceAdjuster: React.FC<PriceAdjusterProps> = ({
  initialQuantity,
  maxStock,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < maxStock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="outline outline-1 hover:outline-blue-500  outline-gray-200  py-1 px-4 rounded-lg  transition duration-300 ease-in-out"
        onClick={handleDecrement}
        disabled={quantity <= 0}
      >
        -
      </button>
      <input
        type="number"
        className="w-20 py-1 px-3 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button
        className="outline outline-1 hover:outline-blue-500  outline-gray-200 py-1 px-4 rounded-lg  transition duration-300 ease-in-out"
        onClick={handleIncrement}
        disabled={quantity >= maxStock}
      >
        +
      </button>
    </div>
  );
};

export default PriceAdjuster;
