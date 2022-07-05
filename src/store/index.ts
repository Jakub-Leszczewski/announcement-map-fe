import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './slices/app-slice'
import { userSlice } from './slices/user-slice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
  }
});

export type Store = typeof store;
export type StoreType = ReturnType<typeof store.getState>;
