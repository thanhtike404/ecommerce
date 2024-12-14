import prismaClient from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

import { revalidateTag } from 'next/cache';
export const GET = async (request: NextRequest) => {
  const email = request.nextUrl.searchParams.get('email') as string;

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
  const orders = await prismaClient.order.findMany({
    where: {
      userId: user?.id,
      orderItems: {
        some: {},
      },
    },
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
      paymentMethod: true,
    },
  });

  const data = orders.map((order) => ({
    id: order.id,
    totalAmount: order.orderItems.reduce(
      (total, item) => total + item.stock.price * item.quantity,
      0
    ),
    paymentMethod: order.paymentMethod.name,
    orderStatus: order.orderStatus,
    orderItems: order.orderItems.map((item) => ({
      id: item.id,
      productId: item.stock.productId,
      productName: item.stock.product.name,
      productImage: item.stock.product.imageUrl,
      quantity: item.quantity,
      price: item.stock.price,
    })),
    createdAt: order.createdAt,
  }));
  revalidateTag(`orders-${email}`);

  return Response.json(data);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    console.log(body, 'its from order api');
    const { email, quantity, stockId } = body;
    const user = await prismaClient.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }));
    }

    const stock = await prismaClient.stock.findUnique({
      where: { id: stockId },
      include: { product: true },
    });

    if (!stock) {
      return new Response(JSON.stringify({ message: 'Stock not found' }));
    }

    console.log('stock found');
    const data = {
      orderDate: new Date(),
      totalAmount: stock.price * quantity,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      shippingAddress: 'idk',
      billingAddress: 'idk',
      paymentMethod: {
        connect: {
          id: 1, // Connect to the existing payment method by ID
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    };

    console.log(data);

    try {
      const order = await prismaClient.order.create({
        data,
      });

      try {
        await prismaClient.orderItem.create({
          data: {
            quantity,
            stock: {
              connect: {
                id: stock.id,
              },
            },
            order: {
              connect: {
                id: order.id,
              },
            },
            unitPrice: stock.price,
            totalPrice: stock.price * quantity,
          },
        });
      } catch (error) {
        return Response.json({
          message: error.message,
          'order error': error.message,
        });
      }
    } catch (error) {
      console.log(error.message);
      return Response.json({ message: error.message });
    }

    // Replace this with your actual logic to generate or fetch invoice ID
    // Example response including the email and invoiceId
    return new Response(JSON.stringify({ user, stock, data, email }));
  } catch (error) {}
};
