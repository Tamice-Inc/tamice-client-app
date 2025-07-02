export const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const email = urlParams.get("email");
  const order_number = urlParams.get("order_number");

  return { email, order_number };
};
