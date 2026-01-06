import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { quizSlice } from "./slices/quizSlice";
import { quizApiSlice } from "./slices/quizApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "quiz-app",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  counterSlice: counterSlice.reducer,
  quizSlice: quizSlice.reducer,
  [quizApiSlice.reducerPath]: quizApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(quizApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
