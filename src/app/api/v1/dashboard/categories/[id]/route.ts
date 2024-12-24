import { NextResponse } from 'next/server';
import prismaClient from '@/lib/db';
import { s3Client, deletes3CategoryIcon, s3Init } from '@/lib/s3/s3Instance';
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

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await request.formData();
    const categoryName = data.get('categoryName') as string;
    const categoryIcon = data.get('categoryIcon') as File | null;

    const category = await prismaClient.category.findUnique({
      where: { id: Number(params.id) },
    });
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // If a new icon is provided, upload it and delete the old one
    if (categoryIcon) {
      const key = (category.iconUrl?.split('/').pop() as string) || '';

      if (key) {
        try {
          await deletes3CategoryIcon(key);
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { error: 'Old image deletion error' },
            { status: 500 }
          );
        }
      }

      try {
        const fileExtension =
          categoryIcon instanceof File
            ? categoryIcon.name.split('.').pop()
            : 'No file uploaded';
        const fileType =
          categoryIcon instanceof File ? categoryIcon.type : 'No file uploaded';
        // Key: Uses the generated key (filename with extension) to store the file in the bucket.
        const categoryIconName =
          categoryIcon instanceof File
            ? categoryIcon.name.split('.').slice(0, -1).join('.')
            : categoryIcon;
        const key = `${Date.now()}_${categoryIconName}.${fileExtension}`;

        const { url, fields } = await s3Init(key, fileType);
        const updateData = {
          categoryName,
          categoryIcon: `${process.env.image_url}/${key}` as string,
        };
        const updateCategory = await prismaClient.category.update({
          where: { id: Number(params.id) },
          data: {
            name: updateData.categoryName as string,
            iconUrl: updateData.categoryIcon,
          },
        });

        return new Response(JSON.stringify({ url, fields }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: 'New image upload error' },
          { status: 500 }
        );
      }
    }

    const updatedCategory = await prismaClient.category.update({
      where: { id: Number(params.id) },
      data: {
        name: categoryName,
      },
    });

    return NextResponse.json(categoryName, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
