import React from 'react';
import prismaClient from '../../../lib/db';
async function page() {
  const categories = await prismaClient.category.findMany();

  return (
    <div>
      <h1>Categories</h1>
      {categories?.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}

export default page;
