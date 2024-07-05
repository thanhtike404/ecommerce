import React, { Suspense } from 'react';
import { getProductById } from './action';
import Image from 'next/image';
import { Images } from 'lucide-react';
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
            <Image
              width={500}
              height={500}
              src={product?.imageUrl ?? 'undefined'}
              alt="pink blazer"
              className="h-96 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              {product?.images?.map((image) => (
                <Image
                  key={image.id}
                  width={100}
                  height={100}
                  src={image.imageUrl}
                  alt="pink blazer"
                  className="h-24 object-cover rounded-lg"
                />
              ))}
            </div>
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
            <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
              <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out">
                Add to Cart
              </button>
              <button className="bg-transparent text-gray-800 py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  );
}

export default ProductDetail;
