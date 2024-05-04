import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchConToken } from '../components/helpers/fetch';

export const useMutateAddPqr = () => {
  const queryClient = useQueryClient();
  const addPqr = async (pqr) => {
    const resp = await fetchConToken('pqr/', pqr, 'POST');
    const data = await resp.json();
    return data;
  };
  return useMutation({
    mutationFn: addPqr,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['chargeslist'] });
    },
  });
};

export const usePqrList = (shopId) => {
  const pqrList = async () => {
    const resp = await fetchConToken('pqr/list', { shopId }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ['pqrlist'], queryFn: pqrList });
};
