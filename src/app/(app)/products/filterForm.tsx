'use client';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
// import { products } from './page'; // Importing the initial list of products

function FilterForm({ products }) {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSearch = (searchQuery, minPriceQuery, maxPriceQuery) => {
    // Convert minPrice and maxPrice to numbers, handle empty strings
    const minPriceNum = minPriceQuery ? parseFloat(minPriceQuery) : 0;
    const maxPriceNum = maxPriceQuery ? parseFloat(maxPriceQuery) : Infinity;

    const filteredProducts = products.filter((product) => {
      const productPrice = parseFloat(product.price.replace('$', ''));
      return (
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        productPrice >= minPriceNum &&
        productPrice <= maxPriceNum
      );
    });

    console.log(filteredProducts);
    // Update the 'products' query with the filtered data
    queryClient.setQueryData(['products'], filteredProducts);
    router.refresh();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      setSearch(value);
      handleSearch(value, minPrice, maxPrice);
    } else if (name === 'minPrice') {
      setMinPrice(value);
      handleSearch(search, value, maxPrice);
    } else if (name === 'maxPrice') {
      setMaxPrice(value);
      handleSearch(search, minPrice, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  };

  return (
    <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-3">
          <Label>Search</Label>
          <Input
            id="search"
            name="search"
            type="text"
            placeholder="Search title"
            value={search}
            onChange={onChangeHandler}
          />
          <Label>Min Price</Label>
          <Input
            id="minPrice"
            name="minPrice"
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={onChangeHandler}
          />
          <Label>Max Price</Label>
          <Input
            id="maxPrice"
            name="maxPrice"
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={onChangeHandler}
          />
        </div>
      </fieldset>
    </form>
  );
}

export default FilterForm;
