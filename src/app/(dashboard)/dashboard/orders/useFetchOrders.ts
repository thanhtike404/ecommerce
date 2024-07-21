import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/dashboard/orders`);
        return response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
    },
  });
};
