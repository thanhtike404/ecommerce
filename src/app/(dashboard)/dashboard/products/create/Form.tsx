'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { create } from './action'; // Import your server action

function CarouselUploader() {
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length < 3) {
      setErrors('At least 3 images are required.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await create(formData); // Use server action to send FormData
      if (!response.success) {
        setErrors(response.message || 'Failed to upload images.');
        return;
      }
      setErrors(null); // Clear errors on success
      console.log('Images successfully submitted:', images);
      setImages([]); // Clear images after successful upload
    } catch (error) {
      console.error('Server error:', error);
      setErrors('Failed to submit images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 max-w-md mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer focus:outline-none"
        >
          <input {...getInputProps()} className="hidden" />
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M4 16l8 8m0 0l8-8m-8 8V4m16 12h16m-16 0l-8-8m8 8l-8 8m0 0v12m0-12h-6m0 0H4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              Drag & drop images here, or click to select files
            </p>
            <p className="mt-1 text-xs text-gray-500">At least 3 images</p>
          </div>
        </div>

        {errors && <p className="text-sm text-red-500 mt-2">{errors}</p>}

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default CarouselUploader;
