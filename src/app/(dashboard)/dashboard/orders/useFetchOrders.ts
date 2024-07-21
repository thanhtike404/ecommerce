import { useQuery, useMutation } from '@tanstack/react-query';
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

interface DeleteResponse {
  message: string;
  deletedIds: number[];
}

export const useDeleteIdsMutation = (deleteIds: number[]) => {
  return useMutation<DeleteResponse, Error, number[]>({
    mutationKey: ['orders', 'delete'],
    mutationFn: async (deleteIds: number[]) => {
      try {
        const response = await axios.post<DeleteResponse>(
          '/api/v1/dashboard/orders',
          { ids: deleteIds } // wrapping deleteIds in an object to match expected API structure
        );
        console.log('Orders deleted:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error deleting orders:', error);
        throw error;
      }
    },
  });
};
