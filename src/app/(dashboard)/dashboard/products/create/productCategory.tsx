'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

export default function ProductCategory({ register }) {
  const fetchCategories = async () => {
    const { data } = await axios.get('/api/v1/dashboard/categories');
    return data;
  };
  const { data: categories, isLoading } = useQuery({
    queryKey: 'categories',
    queryFn: fetchCategories,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <select
              name=""
              id=""
              {...register('category')}
              className="py-3 px-4 bg-white dark:bg-black dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option>select</option>
              {categories &&
                categories.map((category: any) => (
                  <option
                    className="mb-3"
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="category">Status</Label>

            <select
              {...register('status')}
              className="py-3 px-4 bg-white dark:bg-black dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option className="py-1" value="0">
                Archieve
              </option>
              <option className="py-1" value="1">
                Active
              </option>
              <option className="py-1" value="2">
                Draft
              </option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
