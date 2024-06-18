import { TypeCartItem } from "../redux/slices/cart/types";
import { totalPriceCalc } from "./totalPriceCalc";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = totalPriceCalc(items);

  return {
    items: items as TypeCartItem[],
    totalPrice,
  };
};
