import { NextRequest } from 'next/server';
import prismaClient from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1;

    const search = (req.nextUrl.searchParams.get('search') as string) || '';
    const minPrice =
      parseFloat(req.nextUrl.searchParams.get('minPrice') as string) || 0;
    const maxPriceParam = req.nextUrl.searchParams.get('maxPrice');
    const maxPrice = maxPriceParam ? parseFloat(maxPriceParam) : Infinity;

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Create price filter
    const priceFilter: any = { gte: minPrice };
    if (maxPrice !== Infinity) {
      priceFilter.lte = maxPrice;
    }

    const fetchProducts = await prismaClient.product.findMany({
      where: {
        name: {
          contains: search,
        },
        stock: {
          some: {
            price: priceFilter,
          },
        },
      },
      skip: skip,
      take: pageSize,
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

    const totalProducts = await prismaClient.product.count({
      where: {
        name: {
          contains: search,
        },
        stock: {
          some: {
            price: priceFilter,
          },
        },
      },
    });
    const totalPages = Math.ceil(totalProducts / pageSize);
    const hasMore = page < totalPages;

    return NextResponse.json({ products, page, totalPages, hasMore });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ status: 500 });
  }
};
