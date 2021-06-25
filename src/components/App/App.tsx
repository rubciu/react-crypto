import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import styles from "./App.module.scss";
import { Main, NotFound } from "..";

const App = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path="/main">
            <Main />
          </Route>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
