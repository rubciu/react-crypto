import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../store";

export type Currency = {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
};

type Response = {
  data: Currency[];
  info: {
    coins_num: number;
    time: number;
  };
};

const currenciesAdapter = createEntityAdapter<Currency>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    try {
      const response = await axios.get<Response>(
        "https://api.coinlore.net/api/tickers/"
      );
      return response.data.data;
    } catch (error: unknown) {
      return new Promise((resolve, reject) => reject(error));
    }
  }
);

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: currenciesAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.status = "succeeded";
      currenciesAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const currenciesSelectors = currenciesAdapter.getSelectors();

export const selectAllCurrencies = (state: RootState) =>
  currenciesSelectors.selectAll(state.currencies);

export const selectCurrencyById = (
  state: RootState,
  id: number | undefined
) => {
  if (id) {
    return currenciesSelectors.selectById(state.currencies, id);
  }
};

export default currenciesSlice.reducer;
