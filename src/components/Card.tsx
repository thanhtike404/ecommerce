import React from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Button } from './ui/button';
import prismaClient from '@/lib/db';
export type CategoryType = {
  id: number;
  name: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
};

export default function Card({
  categoriesWithProductCount,
}: {
  categoriesWithProductCount: CategoryType[];
}) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {categoriesWithProductCount.map((category) => (
        <div 
          key={category.id} 
          className="group relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-24 h-24 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Image
              priority={true}
              src={category.iconUrl}
              alt={category.name}
              width={60}
              height={60}
              className="w-12 h-12 object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">{category.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{category._count.products} Items</p>
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore
          </Button>
        </div>
      ))}
    </div>
  );
}

// Fetch the data at build time
