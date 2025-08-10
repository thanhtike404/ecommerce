import React, { Suspense } from 'react';
import { getProductById } from './action';
import ProductImage from './productImage';
import AddToCart from './AddToCart';

async function ProductDetail({ id }: { id: string }) {
  const fetchProduct = getProductById.bind(null, { id });
  const { product, message } = await fetchProduct();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto grid place-items-center grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex justify-center w-full">
            <ProductImage
              mainImage={product?.imageUrl}
              images={product?.images}
            />
          </div>
          <div className="flex flex-col justify-center outline outline-1 p-5 outline-gray-100 rounded-sm w-full md:w-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {product?.name}
            </h3>
            <p className="mt-4 text-base text-gray-500 leading-7">
              {product?.description}
            </p>
            <div className="my-8 flex items-center gap-2">
              <div className="text-amber-500">★★★★☆</div>
              <p className="text-sm font-bold text-gray-700">
                4.0/5 (100 reviews)
              </p>
            </div>
            {
              product?.stock && <AddToCart stock={product?.stock} />
            }
          </div>
        </Suspense>
      </div>
    </section>
  );
}

export default ProductDetail;
