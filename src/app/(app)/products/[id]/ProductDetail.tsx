import React, { Suspense } from 'react';
import { getProductById } from './action';
import Image from 'next/image';
import ProductImage from './productImage';
import AddToCart from './AddToCart';
async function ProductDetail({ id }: { id: string }) {
  const fetchProduct = getProductById.bind(null, { id });
  const { product, message } = await fetchProduct();

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log(product, 'product');
  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex">
            <ProductImage
              mainImage={product?.imageUrl}
              images={product?.images}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">{product?.name}</h3>
            <p className="text-2xl font-bold">$1,490</p>
            <p className="mt-4 text-base text-gray-500 leading-7">
              {product?.description}
            </p>
            <div className="my-8 flex items-center gap-2">
              <div className="text-amber-500">★★★★☆</div>
              <p className="text-sm font-bold text-gray-700">
                4.0/5 (100 reviews)
              </p>
            </div>
            <p className="text-blue-gray-500 text-xl font-bold mb-2">Color</p>
            <div className="my-8 flex items-center gap-2">
              <div className="h-5 w-5 rounded border border-gray-900 bg-blue-gray-600"></div>
              <div className="h-5 w-5 rounded border border-blue-gray-100"></div>
              <div className="h-5 w-5 rounded border border-blue-gray-100 bg-gray-900"></div>
            </div>
            <AddToCart product={product} />
          </div>
        </Suspense>
      </div>
    </section>
  );
}

export default ProductDetail;
