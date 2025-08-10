import { s3Client } from './s3Instance';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { Buffer } from 'buffer';

const s3 = s3Client;

export async function uploadToS3(file: File, key: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const webpBuffer = await sharp(buffer).webp().toBuffer();

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: webpBuffer,
    ContentType: 'image/webp',
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    return `${process.env.image_url}/${key}`;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload image to S3');
  }
}
