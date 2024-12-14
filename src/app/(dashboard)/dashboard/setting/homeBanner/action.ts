'use server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { s3Client } from '@/lib/s3Instance';
import prismaClient from '@/lib/db';
import z from 'zod';

// Define the schema for server-side validation
const imageSchema = z.object({
  name: z.string().min(1, 'Image name is required'),
  url: z.string().url('Invalid image URL'),
});

const formSchema = z.object({
  images: z.array(imageSchema).min(3, 'At least 3 images are required'),
});

export const create = async (formData: any) => {
  try {
    // Use formData.getAll to retrieve all images
    const images: File[] = formData.getAll('images') as File[];

    if (images.length < 3) {
      throw new Error('At least 3 images are required.');
    }

    const uploadToS3 = async (arrayBuffer: ArrayBuffer, key: string) => {
      const buffer = Buffer.from(arrayBuffer);
      const webpBuffer = await sharp(buffer).webp().toBuffer();

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: webpBuffer,
        ContentType: 'image/webp',
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
    };
    const storeBannerImage = async (imageUrl: string, title: string) => {
      try {
        await prismaClient.homePageBannner.create({
          data: {
            imageUrl: `${process.env.image_url}/${imageUrl}`, // Ensure this field exists in your Prisma model
            title,
            status: 'INACTIVE',
            createdAt: new Date(),
          },
        });
      } catch (error) {
        console.error('Error storing banner image in the database:', error);
        throw new Error('Failed to store banner image in the database');
      }
    };

    await Promise.all(
      images.map(async (image) => {
        const arrayBuffer = await image.arrayBuffer(); // Convert File to ArrayBuffer
        const title = image.name;
        const key = `homeBanners/${Date.now()}_${image.name.replace(
          /\s+/g,
          '_'
        )}.webp`;
        storeBannerImage(key, title);
        await uploadToS3(arrayBuffer, key);
      })
    );

    return { success: true, message: 'Images uploaded successfully!' };
  } catch (error) {
    console.error('Error during image upload:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation failed',
      };
    }
    return { success: false, message: error.message || 'Something went wrong' };
  }
};
export async function updateBannerStatus(id: number, status: string) {
  try {
    const updatedBanner = await prismaClient.homePageBannner.update({
      where: { id },
      data: { status },
    });
    return updatedBanner;
  } catch (error) {
    console.error('Error updating banner status:', error);
    throw new Error('Failed to update banner status.');
  }
}

export async function deleteBanner(bannerId: number) {
  try {
    await prismaClient.homePageBannner.delete({
      where: { id: bannerId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw new Error('Failed to delete banner');
  }
}
