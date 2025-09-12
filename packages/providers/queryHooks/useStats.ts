import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await axios.get('/api/stats');
      return response.data;
    },
  });
};
