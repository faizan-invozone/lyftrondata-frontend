import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import HomePage from "./Home";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";

const HomePage1 = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}/HomePage`} component={HomePage} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default HomePage1;
