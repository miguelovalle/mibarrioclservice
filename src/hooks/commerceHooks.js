import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch";

export const useMutateAddShop = () => {
  const addCommerce = async (commerce) => {
    const resp = await fetchSinToken("commerce/new", commerce, "POST");
    const data = await resp.json();
    return data;
  };

  return useMutation({ mutationFn: addCommerce });
};

export const useMutateUpdateShop = (id) => {
  const updateShop = async (commerce) => {
    const resp = await fetchConToken(`commerce/${id}`, commerce, "PUT");
    const data = await resp.json();
    return data;
  };
  return useMutation({ mutationFn: updateShop });
};

/* export const useMutateGetCommerce = () => {
  const getCommerce = async (id) => {
    const resp = await fetchConToken(`commerce/${id}`);
    const data = await resp.json();
    return data;
  };

  return useMutation({ mutationFn: getCommerce });
}; */

export const useShop = (id) => {
  const shop = async () => {
    const resp = await fetchConToken(`commerce/${id}`, "GET");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["shop", id], queryFn: shop });
};

export const useShopList = () => {
  const shopList = async () => {
    const resp = await fetchSinToken("commerce/listall");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["shoplist"], queryFn: shopList });
};

export const useGetCategories = () => {
  const typefn = async () => {
    const resp = await fetchSinToken("commerce/cat/types");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["types"], queryFn: typefn });
};

export const useSearch = (searchState) => {
  const search = async () => {
    const resp = await fetchSinToken("commerce/search", searchState, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["search", searchState],
    queryFn: search,
  });
};
