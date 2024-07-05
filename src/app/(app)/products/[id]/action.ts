'use server';
import prismaClient from '@/lib/db';

export const getProductById = async ({ id }: { id: string }) => {
  const data = await prismaClient.product.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      stock: true,
      images: true,
    },
  });

  if (!data) {
    return {
      product: null,
      message: 'Product not found',
    };
  }

  const product = {
    id: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    description: data.description,
    stock: data.stock,
    images: data.images.map((image) => ({
      id: image.id,
      imageUrl: image.url,
    })),
  };

  // Push the product's own image to the images array
  if (data.imageUrl) {
    product.images.push({
      id: data.id,
      imageUrl: data.imageUrl,
    });
  }

  return {
    product,
    message: 'Product fetched successfully',
  };
};
