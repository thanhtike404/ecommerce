import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
export const useFetchOrders = ({ email }: { email: string }) => {
  return useQuery({
    queryKey: ['orders', email],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/v1/order?email=${email}`);
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

export const useOrderStatusChangeMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['order', 'update'],
    mutationFn: async ({
      orderId,
      orderStatus,
    }: {
      orderId: any;
      orderStatus: string;
    }) => {
      const response = await axios.put(`/api/v1/dashboard/orders/${orderId}`, {
        status: orderStatus,
      });
      toast({
        title: 'Order status updated',
        description: 'order updated successfully',
        variant: 'success',
        duration: 3000,
      });
      return response.data;
    },
  });
};

// const response = await axios.put(`/api/v1/dashboard/orders/${orderId}`, {
//   status: orderStatus,
// });
