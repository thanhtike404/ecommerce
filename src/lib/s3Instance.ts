import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
export const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const s3Init = async (key: string, fileType: string) => {
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key, //filename with extension
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 10 MB
    ],
    Fields: {
      acl: 'public-read',
      'Content-Type': fileType,
    },
    Expires: 600, // 10 minutes
  });
  return { url, fields };
};

export const deletes3CategoryIcon = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
  });

  try {
    const data = await s3Client.send(command);
    console.log('Success', data);
    return data;
  } catch (err) {
    console.error('Error', err);
    throw err;
  }
};
