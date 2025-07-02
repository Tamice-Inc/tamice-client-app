import { CartItem } from "../../App";

type cartData = {
  adultInfo: CartItem[];
  childInfo: CartItem[];
};

export const getSubTotal = (
  ticket: CartItem,
  map: Map<any, any>,
  individualTicketsMap: any[]
) => {
  let totalPrice = 0;
  let key = ticket?.cartId;
  let subCategoryId = ticket?.subCategoryId;
  if (key && subCategoryId) {
    let existingTickets = map.get(key) || [];
    if (existingTickets.length === 0) {
      totalPrice +=
        Number(ticket?.subtotal) === -100
          ? -(Number(ticket?.subCategoryPrice) + Number(ticket?.addition)) *
            Number(ticket?.quantity)
          : (Number(ticket?.subCategoryPrice) + Number(ticket?.addition)) *
            Number(ticket?.quantity);
    } else {
      totalPrice +=
        Number(ticket?.subtotal) == -100
          ? -Number(ticket?.addition) * Number(ticket?.quantity)
          : Number(ticket?.addition) * Number(ticket?.quantity);
    }
    map.set(key, existingTickets.concat(ticket));
  } else {
    individualTicketsMap.push(ticket);
    totalPrice +=
      Number(ticket?.subtotal) === -100
        ? -(Number(ticket?.price) * Number(ticket?.quantity))
        : (Number(ticket?.price) * Number(ticket?.quantity))
  }
  console.log(totalPrice, 'PRICE 39')
  return totalPrice;
};

export const parseCartData = (data: cartData) => {
  const adultSubCategoriesMap = new Map();
  const childSubCategoriesMap = new Map();
  const adultIndividualTicketsMap: any[] = [];
  const childIndividualTicketsMap: any[] = [];
  let totalPrice = 0;

  data?.adultInfo?.forEach((ticket: CartItem) => {
    totalPrice += getSubTotal(
      ticket,
      adultSubCategoriesMap,
      adultIndividualTicketsMap
    );
    console.log(totalPrice, 'ADULT LINE 56')
  });

  data?.childInfo?.forEach((ticket: CartItem) => {
    totalPrice += getSubTotal(
      ticket,
      childSubCategoriesMap,
      childIndividualTicketsMap
    );
    console.log(totalPrice, 'CHILD LINE 65')
  });
  return {
    adultSubCategoriesMap: Array.from(adultSubCategoriesMap),
    childSubCategoriesMap: Array.from(childSubCategoriesMap),
    adultIndividualTicketsMap,
    childIndividualTicketsMap,
    totalPrice,
  };
};
