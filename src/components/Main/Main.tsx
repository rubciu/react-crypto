import React, { ChangeEvent, useEffect, useState } from "react";

import { CurrencyInfo } from "../";
import {
  selectAllCurrencies,
  selectCurrencyById,
  fetchCurrencies,
} from "../../features/currencies/currenciesSlice";

import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import styles from "./Main.module.css";

const Main = (): JSX.Element => {
  const [currencyId, setCurrencyId] = useState<number | undefined>(undefined);
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectAllCurrencies);
  const currenciesStatus = useAppSelector((state) => state.currencies.status);
  const currency = useAppSelector((state) =>
    selectCurrencyById(state, currencyId)
  );

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currencyId = parseInt(e.target.value);
    setCurrencyId(currencyId);
  };

  useEffect(() => {
    if (currenciesStatus === "idle") {
      dispatch(fetchCurrencies());
    }
  }, [currenciesStatus, dispatch]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Crypto Info</h1>

      {currencies && currencies.length ? (
        <div>
          <select value={currencyId} onChange={(e) => handleCurrencyChange(e)}>
            <option>Select a currency</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name}
              </option>
            ))}
          </select>
          {currency ? (
            <CurrencyInfo data={currency} />
          ) : (
            <p className={styles.message}>
              Please choose a currency from the list
            </p>
          )}
        </div>
      ) : currenciesStatus === "loading" ? (
        <p>Loading...</p>
      ) : currenciesStatus === "failed" ? (
        <p>
          There has been a problem fetching the currencies, please try again
          later.
        </p>
      ) : null}
    </div>
  );
};

export default Main;
