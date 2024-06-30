'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';
import { s3Client } from '@/lib/s3Instance';
import prismaClient from '@/lib/db';
import sharp from 'sharp';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as File | null;
  const files = formData.getAll('images') as File[];
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;

  let stock: Array<{
    sku: string;
    stock: number;
    price: number;
    size: string;
  }> = [];

  const stockData = formData.get('stock') as string;
  if (stockData) {
    try {
      stock = JSON.parse(stockData).map((item: any) => ({
        sku: item.sku,
        stock: Number(item.stock),
        price: Number(item.price),
        size: item.size,
      }));
    } catch (error) {
      console.error('Error parsing stock data:', error);
      return { success: false, error: 'Invalid stock data' };
    }
  }

  const s3 = s3Client;

  const uploadToS3 = async (file: File, key: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const webpBuffer = await sharp(buffer).webp().toBuffer();

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: webpBuffer,
      ContentType: 'image/webp',
    };

    await s3.send(new PutObjectCommand(uploadParams));
  };

  const createProduct = {
    name,
    description,
    statusId: parseInt(status, 10),
    categoryId: parseInt(category, 10),
  };

  try {
    if (image) {
      const key = `product_images/${Date.now()}._.${image.name}.webp`;
      createProduct.imageUrl = `${process.env.image_url}/${key}`;
      await uploadToS3(image, key);
    }

    const product = await prismaClient.product.create({
      data: createProduct,
    });

    if (files.length > 0) {
      const imageUploadPromises = files.map(async (file) => {
        const key = `product_images/${Date.now()}._.${file.name}.webp`;
        await uploadToS3(file, key);
        const url = `${process.env.image_url}/${key}`;
        return prismaClient.productImage.create({
          data: {
            productId: product.id,
            url,
          },
        });
      });

      await Promise.all(imageUploadPromises);
    }

    if (stock.length > 0) {
      const stockUploadPromises = stock.map(async (variant) => {
        return prismaClient.stock.create({
          data: {
            sku: variant.sku,
            stock: variant.stock,
            price: variant.price,
            size: variant.size,
            productId: product.id,
          },
        });
      });

      await Promise.all(stockUploadPromises);
    }

    return { success: true, stock };
  } catch (error: any) {
    console.error('Error uploading files:', error);
    return { success: false, error: error.message };
  }
}

export async function getCategories() {
  const categories = await prismaClient.category.findMany();
  return categories;
}
