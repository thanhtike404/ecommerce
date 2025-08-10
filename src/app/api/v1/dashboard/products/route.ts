import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const GET = async (request: NextRequest) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        images: true,
        stock: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.formData();

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(error);
  }
};
