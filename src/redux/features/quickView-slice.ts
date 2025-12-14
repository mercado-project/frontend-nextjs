import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: {
    id: 0;
    name: "";
    url: "";
    price: 0;
    finalPrice: 0;
    quantity: 0;
    images: "";
  }
};

const initialState = {
  value: {
    name: "",
    url: "",
    price: 0,
    finalPrice: 0,
    quantity: 0,
    images: "",
  }
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
