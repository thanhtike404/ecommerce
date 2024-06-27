'use client';
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategoryFormValues } from './categorySchema';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

export default function CategoryForm() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: CategoryFormValues) =>
      axios.post('/api/v1/dashboard/categories', data),
    onSuccess: async (data: any, formData: FormData) => {
      const { url, fields } = data.data;

      // Prepare data for S3 upload
      const s3FormData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        s3FormData.append(key, value as string);
      });
      s3FormData.append('file', formData.get('categoryIcon') as Blob);

      // Upload to S3
      await axios.post(url, s3FormData);
    },
    onSettled: (data: any, error: any, variables: CategoryFormValues) => {
      if (!error) {
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
        reset(); // Reset the form after successful submission
        setPreview(null);
        queryClient.invalidateQueries('categories');
        router.refresh();
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create category',
          status: 'error',
        });
      }
      console.log('Mutation is settled.');
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    const formData = new FormData();
    formData.append('categoryName', data.categoryName);
    formData.append('categoryIcon', data.categoryIcon[0]);

    mutation.mutate(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create Category</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="categoryName">Category Title</Label>
            <Input
              type="text"
              id="categoryName"
              {...register('categoryName')}
            />
            {errors.categoryName && (
              <p className="text-red-500 text-xs italic">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categoryIcon">Icon</Label>
            <Input
              id="categoryIcon"
              type="file"
              accept="image/*"
              {...register('categoryIcon')}
              onChange={handleImageChange}
            />
            {errors.categoryIcon && (
              <p className="text-red-500 text-xs italic">
                {errors.categoryIcon.message as string}
              </p>
            )}
            {preview && (
              <div className="mt-2 ">
                <img
                  src={preview}
                  alt="Image Preview"
                  className="h-24 w-24 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
