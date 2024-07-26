import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/db';
export const GET = async (request: NextRequest) => {
  // get categories at least 1 product exists
  //   also wanna show the product count in the category
  try {
    const categories = await prismaClient.category.findMany({
      where: {
        products: {
          some: {},
        },
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(error);
  }
};
