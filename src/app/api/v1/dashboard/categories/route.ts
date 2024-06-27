import { NextResponse, NextRequest } from 'next/server';
import prismaClient from '@/lib/db';
import { s3Init } from '@/lib/s3Instance';
export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const formDataObj = Object.fromEntries(formData.entries());
    const { categoryName, categoryIcon } = formDataObj;
    console.log(categoryName, 'category name');
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

    const updateData: { categoryIcon?: string; categoryName?: string } = {};
    try {
      if (categoryIcon) {
        updateData.categoryIcon = `${process.env.image_url}/${key}` as string;
      }
      if (categoryName) {
        updateData.categoryName = categoryName as string;
      }
      try {
        const create = await prismaClient.category.create({
          data: {
            name: updateData.categoryName as string,
            iconUrl: updateData.categoryIcon,
          },
        });
      } catch (error) {
        console.log(error, 'error by prisma');
      }
    } catch (error) {
      console.log(error, 'error by prisma');
    }
    const { url, fields } = await s3Init(key, fileType);

    return new Response(JSON.stringify({ url, fields }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {}
};

export const GET = async (request: NextRequest) => {
  try {
    const categories = await prismaClient.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
  }
};
