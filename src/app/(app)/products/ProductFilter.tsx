'use client';

import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  searchTerm: string;
  minPrice: number | '';
  maxPrice: number | '';
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  mobileFiltersOpen: boolean;
}

export function ProductFilters({
  searchTerm,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSubmit,
  mobileFiltersOpen
}: ProductFiltersProps) {
  return (
    <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:col-span-3`}>
      <form className="sticky top-24 space-y-6" onSubmit={onSubmit}>
        <div className="rounded-lg border p-4 shadow-sm bg-white">
          <h2 className="text-lg font-medium mb-4">Filters</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="search" className="block mb-1 text-sm font-medium">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={onSearchChange}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="minPrice" className="block mb-1 text-sm font-medium">
                Min Price
              </Label>
              <Input
                id="minPrice"
                name="minPrice"
                type="number"
                placeholder="$0"
                value={minPrice}
                onChange={onMinPriceChange}
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="maxPrice" className="block mb-1 text-sm font-medium">
                Max Price
              </Label>
              <Input
                id="maxPrice"
                name="maxPrice"
                type="number"
                placeholder="$1000"
                value={maxPrice}
                onChange={onMaxPriceChange}
                min="0"
                step="0.01"
              />
            </div>

            <Button type="submit" className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}