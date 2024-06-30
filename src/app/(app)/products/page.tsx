'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import Image from 'next/image';
import FilterForm from './filterForm';
import Link from 'next/link';
import axios from 'axios';

export default function Dashboard() {
  const [loadingImages, setLoadingImages] = React.useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('/api/v1/products');
    return response.data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleOnLoadImage = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: false }));
  };

  const handleImageLoadStart = (productId) => {
    setLoadingImages((prev) => ({ ...prev, [productId]: true }));
  };

  return (
    <div className="grid w-[90%] mx-auto mt-24">
      <TooltipProvider>
        <div className="flex flex-col">
          <main className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-1 lg:grid-cols-12">
            <div
              className="relative hidden flex-col items-start gap-8 lg:flex lg:col-span-3"
              x-chunk="dashboard-03-chunk-0"
            >
              <FilterForm products={data} />
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-9">
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
                {isLoading ? (
                  <h1>Loading ...</h1>
                ) : (
                  data?.map((product) => (
                    <div
                      key={product.id}
                      className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
                    >
                      <div className="relative w-full h-48">
                        {loadingImages[product.id] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span>Loading...</span>
                          </div>
                        )}
                        <Image
                          width={500}
                          height={500}
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                          onLoadingComplete={() =>
                            handleOnLoadImage(product.id)
                          }
                          onLoadStart={() => handleImageLoadStart(product.id)}
                        />
                      </div>
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
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
