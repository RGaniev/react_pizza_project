import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { Pizza, PizzaSliceParams, PizzaSliceState, Status } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], PizzaSliceParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentPage, categoryId, sort, orderType, search } = params;
    const { data } = await axios.get(
      `https://65e4af233070132b3b252039.mockapi.io/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ""
      }&sortBy=${sort.sortProperty}&order=${orderType}${search}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  status: Status.LOADING,
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
