import { NextResponse } from 'next/server';
import prismaClient from '@/lib/db';
import { s3Client, deletes3CategoryIcon } from '@/lib/s3Instance';
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const category = await prismaClient.category.findUnique({
      where: { id: Number(params.id) },
    });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' });
    }

    const key = (category.iconUrl?.split('/').pop() as string) || '';

    // Delete the image from S3
    if (key) {
      try {
        await deletes3CategoryIcon(key);
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'image deletion error' });
      }
    }

    const deleteCategory = await prismaClient.category.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
