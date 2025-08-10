'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, keepPreviousData } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProductFilters } from './ProductFilter';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Search, Filter, Loader2 } from 'lucide-react';
import ProductItem from './ProductItem';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating?: number;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  hasMore: boolean;
}

export default function Dashboard() {
  const queryClient = new QueryClient();
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | ''>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const fetchProducts = async (): Promise<ProductsResponse> => {
    try {
      const response = await axios.get(
        `/api/v1/products?page=${page}&search=${appliedSearch}&minPrice=${appliedMinPrice}&maxPrice=${appliedMaxPrice}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch products');
    }
  };

  const { isLoading, data, error, isFetching, isPlaceholderData } = useQuery<ProductsResponse, Error>({
    queryKey: ['products', page, appliedSearch, appliedMinPrice, appliedMaxPrice],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['products', page + 1, appliedSearch, appliedMinPrice, appliedMaxPrice],
        queryFn: fetchProducts,
      });
    }
  }, [data, isPlaceholderData, page, appliedSearch, appliedMinPrice, appliedMaxPrice, queryClient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMinPrice(e.target.value ? parseFloat(e.target.value) : '');
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMaxPrice(e.target.value ? parseFloat(e.target.value) : '');

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchTerm);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setPage(1);
    setMobileFiltersOpen(false);
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const handleImageLoad = (productId: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  const handleImageError = (productId: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <TooltipProvider>
        <div className="flex flex-col">
          {/* Mobile filter toggle button */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={toggleMobileFilters}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          <main className="grid gap-6 lg:grid-cols-12">

            {/* Filter sidebar */}
            <ProductFilters
              searchTerm={searchTerm}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onSearchChange={handleSearchChange}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onSubmit={handleFilterSubmit}
              mobileFiltersOpen={mobileFiltersOpen}
            />

            {/* Product grid */}
            <div className="lg:col-span-9">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-lg text-gray-600">Loading products...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64 text-red-500">
                  Error loading products. Please try again.
                </div>
              ) : (
                <>
                  {/* Product grid */}
                  <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                    {data?.products?.map((product) => (
                      <ProductItem
                        key={product.id}
                        product={product}
                        loading={loadingImages[product.id]}
                        onImageLoad={() => handleImageLoad(product.id)}
                        onImageError={() => handleImageError(product.id)}
                      />
                    ))}
                  </div>

                  {/* No results message */}
                  {data?.products?.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <p className="text-lg">No products found</p>
                      <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </>
              )}

              {/* Pagination */}
              {!isLoading && data?.totalPages && data.totalPages > 0 && (
                <div className="mt-8 flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-4">
                    Showing page {page} of {data?.totalPages || 1}
                    {isFetching && !isLoading && (
                      <span className="ml-2 inline-flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        Updating...
                      </span>
                    )}
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={page <= 1 ? "opacity-50 cursor-not-allowed" : ""}
                        />
                      </PaginationItem>

                      {/* Show pagination with sensible limits */}
                      {Array.from({ length: Math.min(5, data?.totalPages || 1) }).map((_, index) => {
                        // Calculate page number with logic for current position
                        let pageNumber: number;
                        if (data?.totalPages <= 5) {
                          pageNumber = index + 1;
                        } else if (page <= 3) {
                          pageNumber = index + 1;
                        } else if (page >= (data?.totalPages || 0) - 2) {
                          pageNumber = (data?.totalPages || 0) - 4 + index;
                        } else {
                          pageNumber = page - 2 + index;
                        }

                        return (
                          <PaginationItem key={index}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(pageNumber);
                              }}
                              isActive={pageNumber === page}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      {data?.totalPages > 5 && page < (data?.totalPages || 0) - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {data?.totalPages > 5 && page < (data?.totalPages || 0) - 2 && (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(data?.totalPages || 1);
                            }}
                          >
                            {data?.totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data?.hasMore || page < (data?.totalPages || 0)) setPage(page + 1);
                          }}
                          className={!data?.hasMore && page >= (data?.totalPages || 0) ? "opacity-50 cursor-not-allowed" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}