import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest) => {
  try {
    const fetchProducts = await prismaClient.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        stock: true,
      },
    });

    const products = fetchProducts.map((product) => {
      return {
        id: product.id,
        title: product.name,
        price: `$${product.stock[0]?.price?.toFixed(2) || '0.00'}`, // Ensure the price is formatted as a string with two decimal places
        image: product.imageUrl,
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
  }
};
