import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchConToken } from '../components/helpers/fetch';

export const useMutateAddCharge = () => {
  const queryClient = useQueryClient();
  const addCharge = async (obj) => {
    const resp = await fetchConToken('charge/charge', obj, 'POST');
    const data = await resp.json();
    return data;
  };
  return useMutation({
    mutationFn: addCharge,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['chargeslist'] });
    },
  });
};

export const useMutateUpdateCharge = (chargeId) => {
  const queryClient = useQueryClient();

  const updateCharge = async (obj) => {
    const resp = await fetchConToken(`charge/${chargeId}`, obj, 'PUT');
    const data = await resp.json();
    return data;
  };
  return useMutation({
    mutationFn: updateCharge,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['chargeslist'] });
    },
  });
};

export const useChargeList = (shopId) => {
  const chargeList = async () => {
    const resp = await fetchConToken('charge/chargeslist', { shopId }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ['chargeslist'], queryFn: chargeList });
};

export const useOrderList = (shopId) => {
  const orderList = async () => {
    const resp = await fetchConToken('order/orderall', { shopId }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ['orderslist'], queryFn: orderList });
};

export const useOrderSum = (shopId) => {
  const orderSum = async () => {
    const resp = await fetchConToken('order/ordersum', { shopId }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ['ordersum'], queryFn: orderSum });
};

export const useChargeSum = (shopId) => {
  const chargeSum = async () => {
    const resp = await fetchConToken('charge/chargesum', { shopId }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ['chargesum'], queryFn: chargeSum });
};

export const useGetCommerce = (shopId) => {
  const getCommerce = async () => {
    const resp = await fetchConToken(`commerce/${shopId}`, {}, 'GET');
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ['getCommerce'], queryFn: getCommerce });
};

export const useMutateUpdateOrder = (orderId) => {
  const queryClient = useQueryClient();

  const updateOrder = async (obj) => {
    const resp = await fetchConToken(`order/${orderId}`, obj, 'PUT');
    const data = await resp.json();
    return data;
  };
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: async () => {
      return queryClient.invalidateQueries({ queryKey: ['orderslist'] });
    },
  });
};
90;
