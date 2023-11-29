import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slice/counterSlice/counterSlice";

export const store = configureStore({
  reducer: { counterReducer: counterSlice },
});
