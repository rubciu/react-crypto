import React from "react";
import { Currency } from "../../features/currencies/currenciesSlice";
import styles from "./CurrencyInfo.module.css";
import { CurrencyInfoField } from "../";
import NumberFormat from "react-number-format";

type CurrencyInfoProps = {
  data: Currency;
};

const CurrencyInfo = ({ data }: CurrencyInfoProps): JSX.Element => {
  return (
    <div className={styles.currencyInfo}>
      <h3>
        {data.name} ({data.symbol})
      </h3>
      <div className={styles.info}>
        <CurrencyInfoField label="Rank" value={data.rank} />
        <CurrencyInfoField
          label="Price USD"
          value={
            <NumberFormat
              value={data.price_usd}
              displayType={"text"}
              prefix={"$"}
            />
          }
        />
        <CurrencyInfoField
          label="Price BTC"
          value={
            <NumberFormat
              value={data.price_btc}
              displayType={"text"}
              prefix={"$"}
            />
          }
        />
        <CurrencyInfoField
          label="% Change 24 hours"
          value={data.percent_change_24h}
        />
        <CurrencyInfoField
          label="% Change 1 hour"
          value={data.percent_change_1h}
        />
        <CurrencyInfoField
          label="% Change 7 days"
          value={data.percent_change_7d}
        />
        <CurrencyInfoField
          label="Market Cap USD"
          value={
            <NumberFormat
              value={data.market_cap_usd}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          }
        />
      </div>
    </div>
  );
};

export default CurrencyInfo;
