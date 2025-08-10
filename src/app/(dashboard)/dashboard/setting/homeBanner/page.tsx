// Page.tsx
import React from 'react';
import prismaClient from '@/lib/db';
import CarouselUploader from './CarouselUploader';
import StatusSelector from './StatusSelector';
import ImageWithLightbox from './ImageWithLightbox'; // Import the ImageWithLightbox component

export default async function Page() {
  // Fetch banners from the database
  const banners = await prismaClient.homePageBannner.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="py-4">
      <CarouselUploader />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-300">
          Home Page Banners
        </h2>
        {banners.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full table-auto border-collapse bg-gray-800 text-gray-200">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <tr
                    key={banner.id}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'
                    }`}
                  >
                    <td className="px-4 py-2">{banner.title || 'No Title'}</td>
                    <td className="px-4 py-2">
                      {/* Use ImageWithLightbox component */}
                      <ImageWithLightbox
                        imageUrl={banner.imageUrl}
                        altText={banner.title || 'Banner'}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <StatusSelector
                        bannerId={banner.id}
                        currentStatus={banner.status}
                      />
                    </td>
                    <td className="px-4 py-2">
                      {new Date(banner.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No banners available.</p>
        )}
      </div>
    </div>
  );
}
