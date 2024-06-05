import { configureStore } from "@reduxjs/toolkit";
import chatDataSlice from "./dataSlice";
import asyncDataSlice from "./asyncSlice";

const store = configureStore({
  reducer: {
    chatDataSlice: chatDataSlice.reducer,
    asyncDataSlice: asyncDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;