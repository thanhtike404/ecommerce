import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/db';

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const { status } = body;

    console.log(body, 'request body');

    const updatedData = await prismaClient.order.update({
      where: { id: Number(params.id) },
      data: { orderStatus: status },
    });

    console.log(updatedData);

    return NextResponse.json(
      { message: 'Status updated successfully', data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order status:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
};
