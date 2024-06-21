import React from 'react';
import ProductDetail from './ProductDetail';
function page({ params }) {
  const id = params.id;

  return (
    <div className="grid w-[90%] mx-auto mt-24">
      <ProductDetail id={id} />
    </div>
  );
}

export default page;
