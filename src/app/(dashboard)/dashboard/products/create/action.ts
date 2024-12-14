'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';
import { s3Client } from '@/lib/s3Instance';
import prismaClient from '@/lib/db';
import sharp from 'sharp';
import { z } from 'zod';

// Define Zod schemas
const productImageSchema = z.object({
  url: z.string().url('Invalid URL for product image'), // Ensure it's a valid URL
});

const stockSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  size: z.string().optional(), // Size is optional
});

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  categoryId: z
    .number()
    .int()
    .nonnegative('Category ID must be a non-negative integer'),
  statusId: z
    .number()
    .int()
    .nonnegative('Status ID must be a non-negative integer'),
  images: z.array(productImageSchema).optional(), // Array of product images
  stock: z.array(stockSchema).optional(), // Array of stock items
});

export async function createProduct(formData: FormData) {
  // Extract data from formData
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as File | null;
  const files = formData.getAll('images') as File[];
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;
  console.log(image);
  // Parse and validate stock data
  let stock: Array<{
    sku: string;
    stock: number;
    price: number;
    size: string;
  }> = [];

  const stockData = formData.get('stock') as string;

  try {
    productSchema.parse(stockData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error);
      return { success: false, error: 'Validation error' };
    }
  }

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

  // Validate the entire product data using Zod
  const productData = {
    name,
    description,
    categoryId: parseInt(category, 10),
    statusId: 1,
    images: files.map((file) => ({ url: file.name })), // Dummy URLs for validation
    stock,
  };

  // try {
  //   productSchema.parse(productData);
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     console.error('Validation errors:', error);
  //     return { success: false, error: 'Validation error' };
  //   }
  // }

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

  const createProductData = {
    name,
    description,
    imageUrl: image?.name,
    statusId: parseInt(status, 10),
    categoryId: parseInt(category, 10),
  };

  try {
    if (image) {
      const key = `product_images/${Date.now()}._.${image.name}.webp`;
      createProductData.imageUrl = `${process.env.image_url}/${key}`;
      await uploadToS3(image, key);
    }

    const product = await prismaClient.product.create({
      data: createProductData,
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

// image error happens because iv en't added image .name
// there is also product status error because there is no data in db
