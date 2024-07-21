// components/ProductTable/useFetchProducts.ts
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: { name: string };
  stock: Array<{ id: string; size: string; price: string; stock: string }>;
  statusId: number;
  createdAt: string;
}

export const useFetchProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/v1/dashboard/products');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });
};
