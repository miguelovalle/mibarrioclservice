import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSinToken } from "../components/helpers/fetch";

export const useLogin = (mail, hasMail) => {
  const flogin = async () => {
    const resp = await fetchSinToken(
      "customer/login",
      { mail: mail.email, password: mail.password },
      "POST"
    );

    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["login", mail, hasMail],
    queryFn: flogin,
    enabled: hasMail,
  });
};

export const useUserDetail = (id) => {
  const user = async () => {
    const resp = await fetchSinToken("auth/userDetail", { id }, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["user"], queryFn: user });
};

export const useAdduser = () => {
  const addUser = async (specialist) => {
    const resp = await fetchSinToken("customer/new", specialist, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation({ mutationFn: addUser });
};
