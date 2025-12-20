import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { quizSlice } from "./slices/quizSlice";
import { quizApiSlice } from "./slices/quizApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counterSlice: counterSlice.reducer,
    quizSlice: quizSlice.reducer,
    [quizApiSlice.reducerPath]: quizApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
