'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, keepPreviousData } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function Dashboard() {
  const queryClient = new QueryClient();
  const [loadingImages, setLoadingImages] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const fetchProducts = async () => {

    try{
      const response = await axios.get(
          `/api/v1/products?page=${page}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      return response.data;
    }catch (err){
      console.error(err);
    }
  };

  const { isLoading, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['products', page, search, minPrice, maxPrice],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['products', page + 1, search, minPrice, maxPrice],
        queryFn: fetchProducts,
      });
    }
  }, [data, isPlaceholderData, page, search, minPrice, maxPrice, queryClient]);

  const handleSearchChange = (e: any) => setSearch(e.target.value);
  const handleMinPriceChange = (e: any) =>
    setMinPrice(parseFloat(e.target.value) || '');
  const handleMaxPriceChange = (e: any) =>
    setMaxPrice(parseFloat(e.target.value) || '');

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="grid w-[90%] mx-auto mt-24">
      <TooltipProvider>
        <div className="flex flex-col">
          <main className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-1 lg:grid-cols-12">
            <div
              className="relative hidden flex-col items-start gap-8 lg:flex lg:col-span-3"
              x-chunk="dashboard-03-chunk-0"
            >
              <form
                className="grid w-full items-start gap-6"
                onSubmit={handleFilterSubmit}
              >
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label>Search</Label>
                    <Input
                      id="search"
                      name="search"
                      type="text"
                      placeholder="Search title"
                      value={search}
                      onChange={handleSearchChange}
                    />
                    <Label>Min Price</Label>
                    <Input
                      id="minPrice"
                      name="minPrice"
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                    <Label>Max Price</Label>
                    <Input
                      id="maxPrice"
                      name="maxPrice"
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                    <button type="submit" className="btn btn-primary mt-4">
                      Apply Filters
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-9">
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
                {isLoading ? (
                  <h1>Loading ...</h1>
                ) : (
                  data?.products?.map((product: any) => (
                    <div
                      key={product.id}
                      className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
                    >
                      <div className="relative w-full h-48">
                        {loadingImages[product.id] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span>Loading...</span>
                          </div>
                        )}
                        <Image
                          width={500}
                          height={500}
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-white">
                            {product.title}
                          </h3>
                          <span className="text-gray-300 font-bold">
                            {product.price}
                          </span>
                          <br />
                          <Link
                            className="text-white"
                            href={`/products/${product.id}`}
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="d-flex">
                <h1>Total Items:</h1>
                {isFetching ? <span> Loading...</span> : null}{' '}
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setPage((old) => Math.max(old - 1, 0))}
                        aria-disabled={page === 0}
                      />
                    </PaginationItem>
                    {/* Render pagination items dynamically based on the total number of pages */}
                    {Array.from({ length: data?.totalPages ?? 10 }).map(
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            onClick={() => setPage(index + 1)}
                            className={index + 1 === page ? 'active' : ''}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => {
                          setPage((old) => (data?.hasMore ? old + 1 : old));
                        }}
                      />
                      {
                        // Since the last page's data potentially sticks around between page requests,
                        // we can use `isFetching` to show a background loading
                        // indicator since our `status === 'pending'` state won't be triggered
                        isFetching ? <span> Loading...</span> : null
                      }{' '}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
