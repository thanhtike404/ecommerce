'use client';
import { useState, ChangeEvent, useEffect } from 'react';
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
import {
  createCategorySchema,
  updateCategorySchema,
  CreateCategoryFormValues,
  UpdateCategoryFormValues,
} from './categorySchema';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import useCategoryStore from '@/store/dashboard/categoryStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from './Spinner'; // Ensure you have a Spinner component

export default function CategoryForm() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const clearSelectedCategory = useCategoryStore(
    (state) => state.clearSelectedCategory
  );

  clearSelectedCategory;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryFormValues | UpdateCategoryFormValues>({
    resolver: zodResolver(
      selectedCategory ? updateCategorySchema : createCategorySchema
    ),
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createCategory = useMutation({
    mutationFn: (data: FormData) =>
      axios.post('/api/v1/dashboard/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),

    onSuccess: async (data: any, formData: FormData) => {
      toast({
        title: 'Success',
        description: 'Category created successfully',
      });

      reset();
      setPreview(null);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      router.refresh();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create category',
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: (data: FormData) =>
      axios.put(`/api/v1/dashboard/categories/${selectedCategory?.id}`, data),
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
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
      reset();
      setPreview(null);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      router.refresh();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update category',
      });
    },
  });

  const onSubmit = (
    data: CreateCategoryFormValues | UpdateCategoryFormValues
  ) => {
    const formData = new FormData();
    formData.append('categoryName', data.categoryName);

    if (data.categoryIcon && data.categoryIcon.length > 0) {
      formData.append('categoryIcon', data.categoryIcon[0]);
    }

    selectedCategory
      ? updateCategory.mutate(formData)
      : createCategory.mutate(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setPreview(null);
  };

  useEffect(() => {
    if (selectedCategory) {
      reset({
        categoryName: selectedCategory.name,
      });
      setPreview(selectedCategory.iconUrl);
    } else {
      reset();
      setPreview(null);
    }
  }, [selectedCategory, reset]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {selectedCategory ? 'Update Category' : 'Create Category'}
        </CardTitle>
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
              <div className="mt-2 relative h-24 w-24">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner /> {/* Your spinner or loading indicator */}
                  </div>
                )}
                <img
                  src={preview}
                  alt="Image Preview"
                  className={`h-24 w-24 object-cover rounded-md ${
                    loading ? 'invisible' : 'visible'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            {selectedCategory ? 'Update' : 'Create'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
