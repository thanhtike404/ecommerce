import prismaClient from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
export const GET = async (req: NextRequest, { params }) => {
  const item = await prismaClient.stock.findUnique({
    where: {
      id: parseInt(params.stockId),
    },
    include: {
      product: true,
    },
  });
  console.log(item, 'item');
  return NextResponse.json(item);
};
