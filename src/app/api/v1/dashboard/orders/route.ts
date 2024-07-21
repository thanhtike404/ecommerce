import { NextResponse, NextRequest } from 'next/server';
import prismaClient from '@/lib/db';

import { revalidateTag } from 'next/cache';
export const GET = async (request: NextRequest) => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderItems: {
        include: {
          stock: {
            include: {
              product: true,
            },
          },
        },
      },
      user: true,
    },
  });

  const data = orders.map((order) => ({
    id: order.id,
    totalAmount: order.orderItems.reduce(
      (total, item) => total + item.stock.price * item.quantity,
      0
    ),

    userImage: order.user.image,
    email: order.user.email,
    orderStatus: order.orderStatus,
    orderItems: order.orderItems.map((item) => ({
      id: item.id,
      productId: item.stock.productId,
      productName: item.stock.product.name,
      productImage: item.stock.product.imageUrl,
      quantity: item.quantity,
      price: item.stock.price,
    })),
  }));
  revalidateTag(`orders-all`);

  return Response.json(data);
};
