'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import Image from 'next/image';
import FilterForm from './filterForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export const products = [
  {
    id: 1,
    title: 'Product 1',
    price: '$19.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    title: 'Product 2',
    price: '$29.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    title: 'Product 3',
    price: '$39.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 4,
    title: 'Product 4',
    price: '$49.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 5,
    title: 'Product 5',
    price: '$59.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 6,
    title: 'Product 6',
    price: '$69.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 7,
    title: 'Product 7',
    price: '$79.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 8,
    title: 'Product 8',
    price: '$89.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 9,
    title: 'Product 9',
    price: '$99.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 10,
    title: 'Product 10',
    price: '$109.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 10,
    title: 'Product 10',
    price: '$109.99',
    image: 'https://via.placeholder.com/300',
  },
];

export default function Dashboard() {
  const fetchProducts = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return products;
  };

  const { isPending, isError, data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div className="grid w-[90%] mx-auto mt-24">
      <TooltipProvider>
        <div className="flex flex-col">
          <main className=" grid flex-1 gap-4 overflow-auto p-4 grid-cols-1 lg:grid-cols-12">
            <div
              className="relative hidden flex-col items-start gap-8 lg:flex lg:col-span-3"
              x-chunk="dashboard-03-chunk-0"
            >
              <FilterForm />
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-9">
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
                {isLoading && <h1>Loading ...</h1>}
                {data?.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
                  >
                    <Image
                      width={0}
                      height={0}
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-white">
                          {product.title}
                        </h3>
                        <span className="text-gray-300 font-bold">
                          {product.price}
                        </span>
                        <br />
                        <Link href={`/products/${product.id}`}>Detail</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
