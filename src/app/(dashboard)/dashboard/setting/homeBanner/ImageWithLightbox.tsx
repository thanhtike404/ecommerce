'use client';

import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import Image from 'next/image';

interface ImageWithLightboxProps {
  imageUrl: string;
  altText: string;
}

const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({
  imageUrl,
  altText,
}) => {
  // Lightbox state
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
    images: [] as string[], // Array to hold images for lightbox
  });

  // Handle opening the lightbox with the clicked image
  const handleImageClick = () => {
    // Log the image URL to ensure it's correct
    console.log('Opening lightbox with image URL:', imageUrl);

    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: 1,
      images: [imageUrl], // Single image for now
    });
  };

  return (
    <div>
      {/* Image with onClick to trigger lightbox */}
      <Image
        width={400}
        height={400}
        src={imageUrl}
        alt={altText}
        className="w-40 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition"
        onClick={handleImageClick}
      />

      {/* Lightbox component */}
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={lightboxController.images} // Make sure sources is an array of valid URLs
        slide={lightboxController.slide}
      />
    </div>
  );
};

export default ImageWithLightbox;
