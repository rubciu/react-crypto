import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from '../features/currencies/currenciesSlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
