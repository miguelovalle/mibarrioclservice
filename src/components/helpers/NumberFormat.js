export const NumberFormat = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);

export const unixToString = (value) => {
  const dateStr = new Date(value).toLocaleDateString();
  return dateStr;
};
