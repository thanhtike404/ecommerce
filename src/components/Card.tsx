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
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-2">
      {categoriesWithProductCount.map((category) => (
        <div key={category.id} className="relative flex flex-col items-center">
          <div className="w-[240px] h-[240px] md:w-[200px] md:h-[200px] bg-grayColor rounded-xl">
            <Image
              priority={true}
              src={category.iconUrl}
              alt={category.name}
              width={300}
              height={300}
              className="w-full h-full object-cover pt-12"
            />
          </div>
          <h3 className="text-lg mt-2 md:mt-5">{category.name}</h3>
          <p className="font-bold">{category._count.products} Items</p>
          <Button>View</Button>
        </div>
      ))}
    </div>
  );
}

// Fetch the data at build time
