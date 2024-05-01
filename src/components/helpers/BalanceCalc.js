import {
  useChargeSum,
  useGetCommerce,
  useOrderSum,
} from "../../hooks/balanceHooks";

export const BalanceCalc = (shopId) => {
  //const shopId = sessionStorage.getItem("shopId");

  const resultOrder = useOrderSum(shopId);

  const resultCharge = useChargeSum(shopId);

  const resultRules = useGetCommerce(shopId);

  const commision = resultRules?.data?.result?.rules?.commision;

  const totalCharge = resultCharge?.data?.totalCharges[0]?.TotalCharge;

  const totalOrder = resultOrder?.data?.totalOrders[0]?.Total;
  const balance =
    Number(totalCharge) - Number(totalOrder) * Number(commision / 100);

  return balance;
};
