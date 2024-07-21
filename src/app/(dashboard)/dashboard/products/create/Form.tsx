'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProductDetails from './productDetail';
import ProductCategory from './productCategory';
import ProductStock from './productStock';
import ProductImages from './productImages';
import { createProduct } from './action';
import { useRouter } from 'next/navigation';

export default function ProductForm() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [loading, setLoading] = useState(false); // Loading state
  const { register, handleSubmit, setValue } = useForm();

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
    event.target.value = '';
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage([file]);
    } else {
      setSelectedImage([]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) =>
      prevImages?.filter((_, i) => i !== index)
    );
  };

  const submitProduct = async (data: any) => {
    setLoading(true); // Set loading to true when form is submitting

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('status', data.status);

    // Remove null or undefined variants
    const validVariants = data.variants.filter(
      (variant: any) => variant !== null && variant !== undefined
    );

    formData.append('stock', JSON.stringify(validVariants));

    if (selectedImage.length > 0) {
      formData.append('image', selectedImage[0]);
    }

    selectedImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await createProduct(formData);

      if (response.success) {
        router.push('/dashboard/products');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to upload files');
    } finally {
      setLoading(false); // Set loading to false after form submission
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProduct)}>
      <div className="w-ful mx-auto">
        <div className="flex items-center gap-4 my-3">
          <Button className="h-7 w-7" disabled={loading}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Pro Controller
          </h1>
          <Badge className="ml-auto sm:ml-0">In stock</Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button disabled={loading}>Discard</Button>
            <Button disabled={loading} type="submit">
              Save Product
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <ProductDetails register={register} />

            <ProductCategory register={register} />

            <ProductStock register={register} />
          </div>
          <ProductImages
            register={register}
            selectedImages={selectedImages}
            selectedImage={selectedImage}
            handleImagesChange={handleImagesChange}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button disabled={loading}>Discard</Button>
          <Button disabled={loading} type="submit">
            Save Product
          </Button>
        </div>
      </div>
    </form>
  );
}
