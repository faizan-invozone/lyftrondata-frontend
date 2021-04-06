import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import { DashboardNav } from "./NavItems";

class NavDummy extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu content={DashboardNav} activeLinkFromLocation
          className="vertical-nav-menu" classNameStateIcon="pe-7s-angle-down"/>
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(NavDummy);
