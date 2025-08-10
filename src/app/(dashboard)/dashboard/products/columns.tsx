import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import React, { useState } from 'react';
import { AccessorFnColumnDefBase } from '@tanstack/react-table';
// @ts-ignore
import FsLightbox from 'fslightbox-react';

import { Product } from '@/types/ProductType';

const columns: ColumnDef<Product>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: (info) => {
      // Get all images for the product
      const productData = info.row.original as Product;
      const images = productData.images.map((image) => image.url);
      // images.unshift(info.getValue('imageUrl'));
      images.unshift(info.row.original.imageUrl);
      const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1,
      });

      const handleImageClick = (index: number) => {
        setLightboxController({
          toggler: !lightboxController.toggler,
          slide: index + 1, // Open the clicked image in the lightbox
        });
      };

      return (
        <div>
          {/* Show the main image as a clickable thumbnail */}
          <Image
            src={info.getValue() as string} // Main image
            alt="product"
            width={50}
            height={50}
            onClick={() => handleImageClick(0)} // Open lightbox with the first image
            style={{ cursor: 'pointer' }}
          />

          {/* Lightbox showing all product images */}
          <FsLightbox
            toggler={lightboxController.toggler}
            sources={images} // Pass all images to lightbox
            slide={lightboxController.slide} // Show the clicked image in lightbox
          />
        </div>
      );
    },
  },
  {
    header: 'Category',
    accessorKey: 'category.name',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info) => {
      const stockData = info.getValue() as Product['stock'];

      return (
        <div className="space-y-2">
          {stockData.map((stock) => (
            <div
              key={stock.id}
              className="flex flex-col p-2 bg-gray-100 rounded-md shadow-md"
            >
              <span className="text-sm font-medium text-gray-700">
                Size: <span className="text-gray-900">{stock.size}</span>
              </span>
              <span className="text-sm font-medium text-gray-700">
                Price: <span className="text-gray-900">{stock.price}</span>
              </span>
              <span className="text-sm font-medium text-gray-700">
                Stock: <span className="text-gray-900">{stock.stock}</span>
              </span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'statusId',
    header: 'Status',
    cell: (info) => (
      <Badge color="primary">
        {info.getValue() === 1 ? 'Draft' : 'Published'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
  },
];

export default columns;
