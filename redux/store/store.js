import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slice/counterSlice/counterSlice";
import userSlice from "../slice/userSlice/userSlice";
import cartSlice from "../slice/cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    counterReducer: counterSlice,
    userReducer: userSlice,
    cartReducer: cartSlice,
  },
});
