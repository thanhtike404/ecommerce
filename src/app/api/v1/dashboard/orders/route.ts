import { NextResponse, NextRequest } from 'next/server';
import prismaClient from '@/lib/db';
import { revalidateTag } from 'next/cache';

export const GET = async (request: NextRequest) => {
  const orders = await prismaClient.order.findMany({
    include: {
      paymentMethod: true,
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
    paymentMethod: order.paymentMethod.name,

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

  revalidateTag('orders-all');
  return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
  try {
    const { ids: deleteIds } = await request.json();
    const deletePromises = deleteIds.map((id: number) =>
      prismaClient.order.delete({
        where: {
          id,
        },
      })
    );

    const deleteResults = await Promise.all(deletePromises);

    // Revalidate the cache
    revalidateTag('orders-all');

    return NextResponse.json({
      message: 'Orders deleted successfully',
      deletedIds: deleteResults.map((result) => result.id),
    });
  } catch (error) {
    console.error('Error deleting orders:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete orders',
        error: error.message,
      },
      { status: 500 }
    );
  }
};
