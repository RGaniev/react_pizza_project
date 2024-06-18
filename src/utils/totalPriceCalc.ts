import { TypeCartItem } from "../redux/slices/cart/types";

export const totalPriceCalc = (items: TypeCartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
};
