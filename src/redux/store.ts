import { configureStore } from "@reduxjs/toolkit";

import weatherDataReducer from "./features/weatherData";

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
