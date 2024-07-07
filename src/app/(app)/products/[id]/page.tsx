import React from 'react';
import ProductDetail from './ProductDetail';
function page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);

  return (
    <div className="grid w-[90%] mx-auto mt-4">
      <ProductDetail id={id} />
    </div>
  );
}

export default page;
