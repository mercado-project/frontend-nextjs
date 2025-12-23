// import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// type InitialState = {
//   items: CartItem[];
// };

// type CartItem = {
//   id: number;
//   name: string;
//   url: string;
//   prices: number;
//   finalPrice: number;
//   quantity: number;
//   images: string;
// };

// const initialState: InitialState = {
//   items: [],
// };

// export const cart = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<CartItem>) => {
//       const { id, name, url, prices, quantity, finalPrice, images } =
//         action.payload;
//       const existingItem = state.items.find((item) => item.id === id);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({
//           id,
//           name,
//           url,
//           prices,
//           quantity,
//           finalPrice,
//           images,
//         });
//       }
//     },
//     removeItemFromCart: (state, action: PayloadAction<number>) => {
//       const itemId = action.payload;
//       state.items = state.items.filter((item) => item.id !== itemId);
//     },
//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ id: number; quantity: number }>
//     ) => {
//       const { id, quantity } = action.payload;
//       const existingItem = state.items.find((item) => item.id === id);

//       if (existingItem) {
//         existingItem.quantity = quantity;
//       }
//     },

//     removeAllItemsFromCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const selectCartItems = (state: RootState) => state.cartReducer.items;

// export const selectTotalPrice = createSelector([selectCartItems], (items) => {
//   return items.reduce((total, item) => {
//     return total + item.prices * item.quantity;
//   }, 0);
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   updateCartItemQuantity,
//   removeAllItemsFromCart,
// } = cart.actions;
// export default cart.reducer;



import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItem = {
  id: number;
  name: string;
  url: string;
  price: number;     // ✅ preço FINAL normalizado
  quantity: number;
  images: any[];
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<any>) => {
      const raw = action.payload;

      const basePrice = Number(raw.prices?.[0]?.price ?? 0);

      const promo = raw.promotions?.find((p: any) => p.active === true);

      const finalPrice = promo
        ? Number(promo.promotionalPrice)
        : basePrice;

      const existingItem = state.items.find(
        (item) => item.id === raw.id
      );

      if (existingItem) {
        existingItem.quantity += raw.quantity;
      } else {
        state.items.push({
          id: raw.id,
          name: raw.name,
          url: raw.url,
          price: finalPrice,     // ✅ NUMBER GARANTIDO
          quantity: raw.quantity,
          images: raw.images,
        });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: RootState) =>
  state.cartReducer.items;

/**
 * ✅ SUBTOTAL SEM NaN
 */
export const selectTotalPrice = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
);

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;

export default cart.reducer;
