'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

// Fix type errors with proper interface
interface ImageItem {
  id?: number;
  imageUrl: string;
}

interface ProductImageProps {
  mainImage: string;
  images: ImageItem[];
  title?: string;
}

function ProductImage({ mainImage, images, title = "Product preview" }: ProductImageProps) {
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [magnifierActive, setMagnifierActive] = useState(false);

  useEffect(() => {
    if (!imgRef.current || !magnifierRef.current || !containerRef.current) return;

    const img = imgRef.current;
    const magnifierGlass = magnifierRef.current;
    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnifierActive) return;

      const { left, top, width, height } = container.getBoundingClientRect();

      // Calculate cursor position relative to the image
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Ensure the magnifier stays within the image boundaries
      const magnifierSize = magnifierGlass.offsetWidth;
      const posX = Math.max(0, Math.min(width - magnifierSize, x - magnifierSize / 2));
      const posY = Math.max(0, Math.min(height - magnifierSize, y - magnifierSize / 2));

      // Set the magnifier position
      magnifierGlass.style.left = `${posX}px`;
      magnifierGlass.style.top = `${posY}px`;

      // Calculate the background position for zoomed effect
      const zoomFactor = 2;
      const bgX = (x / width) * 100;
      const bgY = (y / height) * 100;

      magnifierGlass.style.backgroundImage = `url(${selectedImage})`;
      magnifierGlass.style.backgroundPosition = `${bgX}% ${bgY}%`;
      magnifierGlass.style.backgroundSize = `${width * zoomFactor}px ${height * zoomFactor}px`;
    };

    const handleMouseEnter = () => {
      setMagnifierActive(true);
      magnifierGlass.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      setMagnifierActive(false);
      magnifierGlass.style.opacity = '0';
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove as EventListener);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Clean up event listeners
    return () => {
      container.removeEventListener('mousemove', handleMouseMove as EventListener);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [selectedImage, magnifierActive]);

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto my-8">
      {session?.user && (
        <div className="mb-4 text-sm text-gray-600">
          Logged in as: {session.user.name || session.user.email}
        </div>
      )}

      {/* Main image container with fixed dimensions */}
      <div className="w-full h-96 relative mb-6 bg-white" ref={containerRef}>
        {selectedImage && (
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={selectedImage}
              alt={title}
              className="object-contain"
              ref={imgRef}
              priority
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div
              ref={magnifierRef}
              className="absolute pointer-events-none rounded-full shadow-lg border-2 border-white opacity-0 transition-opacity w-32 h-32 bg-no-repeat"
              style={{
                backgroundSize: 'cover',
                zIndex: 10
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Thumbnail gallery with fixed sizes */}
      {images && images.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id || `img-${index}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(image.imageUrl)}
              className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all w-16 h-16 relative bg-white ${selectedImage === image.imageUrl ? 'border-blue-500' : 'border-gray-200'
                }`}
            >
              <Image
                height={400}
                width={404}
                src={image.imageUrl}
                alt={`${title} thumbnail ${index + 1}`}
                className="object-contain"


              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImage;