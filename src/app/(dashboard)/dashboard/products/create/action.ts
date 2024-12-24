'use server';
import { uploadToS3 } from '@/lib/s3/upload';
import prismaClient from '@/lib/db';
import { z } from 'zod';

// Define the stock schema
const stockSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  size: z.string().optional(),
});

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as File | null;
  const files = formData.getAll('images') as File[];
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;
  const stockData = formData.get('stock') as string; // The stock data should be a JSON string.

  if (!name || !category || !status) {
    return { success: false, error: 'Name, category, and status are required' };
  }

  // Validate and parse stock data
  let stock: Array<{
    sku: string;
    stock: number;
    price: number;
    size: string;
  }> = [];
  try {
    if (stockData) {
      stock = JSON.parse(stockData).map((item: any) => ({
        sku: item.sku,
        stock: Number(item.stock),
        price: Number(item.price),
        size: item.size,
      }));

      // Validate stock data using Zod
      stock.forEach((item) => {
        stockSchema.parse(item); // Throws error if validation fails
      });
    }
  } catch (error) {
    console.error('Error parsing stock data:', error);
    return { success: false, error: 'Invalid stock data' };
  }

  try {
    let imageUrl = null;

    // Handle main image upload
    if (image) {
      const key = `product_images/${Date.now()}_${image.name}.webp`;
      imageUrl = await uploadToS3(image, key);
    }

    // Create product in the database
    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        imageUrl,
        categoryId: parseInt(category, 10),
        statusId: parseInt(status, 10),
      },
    });

    // Handle additional images upload
    if (files.length > 0) {
      const imageUploadPromises = files.map(async (file) => {
        const key = `product_images/${Date.now()}_${file.name}.webp`;
        const url = await uploadToS3(file, key);

        return prismaClient.productImage.create({
          data: {
            productId: product.id,
            url,
          },
        });
      });

      await Promise.all(imageUploadPromises);
    }

    // Handle stock data
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

    return { success: true, product };
  } catch (error: any) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
}
