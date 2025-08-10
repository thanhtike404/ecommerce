import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from './type';

export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/v1/dashboard/users');
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
  });
};
