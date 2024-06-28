import React from 'react';
import CategoryTable from './categoriesTable';
import prismaClient from '@/lib/db';
import CategoryForm from './CategoryForm';

async function page() {
  const categories = await prismaClient.category.findMany();
  console.log(categories);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-2xl">
          <CategoryTable categories={categories} />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-3xl">
          <h3 className="mt-11 mb-2">Create Category</h3>
          <CategoryForm />
        </div>
      </div>
    </div>
  );
}

export default page;
