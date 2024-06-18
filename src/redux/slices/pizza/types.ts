import { Sort } from "../filter/types";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
};

export interface PizzaSliceState {
  status: Status;
  items: Pizza[];
}

export type PizzaSliceParams = {
  currentPage: number;
  categoryId: number;
  sort: Sort;
  isASC: boolean;
  orderType: string;
  search: string;
};

export type SearchPizzaParams = {
  currentPage: string;
  categoryId: string;
  sort: string;
  isASC: boolean;
  orderType: string;
  search: string;
};
