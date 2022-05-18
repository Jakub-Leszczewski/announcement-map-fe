import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './slices/app-slice'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  }
});

export type StoreType = ReturnType<typeof store.getState>;