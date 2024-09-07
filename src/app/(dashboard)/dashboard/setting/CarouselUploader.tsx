import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function CarouselUploader() {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const imagesArray = acceptedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <div className="py-4 max-w-md mx-auto">
      <form className="space-y-4">
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
            <p className="mt-1 text-xs text-gray-500">at least 3 images</p>
          </div>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-auto rounded-lg"
                />
                <button
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
      </form>
    </div>
  );
}

export default CarouselUploader;
