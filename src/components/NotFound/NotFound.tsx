import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = (): JSX.Element => {
  const history = useHistory();
  return (
    <div className={styles.notfound}>
      <div className={styles.title}>Oops..</div>
      <p className={styles.message}>
        The page you are trying to reach does not exist, please click on the
        button bellow to be redirected to the main page
      </p>
      <button
        className={styles.button}
        onClick={() => {
          history.push("/main");
        }}
      >
        Back to main
      </button>
    </div>
  );
};

export default NotFound;
