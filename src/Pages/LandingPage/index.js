import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "./lyftron.png";
import postgres from "./Postgresql.png";
import SQL from "./sql.png";
import oracle from "./oracle.png";
import "./styles.css";

const LandingPage = (props) => {
  return (
    <Fragment>
      <header class="header">
        <div class="header-info">
          <img src={logo} alt="lyftron" />
          <h3>Lyftron Data</h3>
          <h4>Manage your data</h4>
          <Link to="/dashboard/basic">
            <button class="btn" href="#experience">
              GET STARTED
            </button>
          </Link>
        </div>
      </header>

      <section id="experience" class="section experience-sec">
        <div class="section-header">Databases</div>
        <div class="experience-container">
          <div class="experience-item">
            <span class="item-logo">
              <img src={postgres} />
            </span>
            <span class="item-name">Postgres</span>
          </div>
          <div class="experience-item">
            <span class="item-logo">
              <img src={SQL} />
            </span>
            <span class="item-name">SQL</span>
          </div>
          <div class="experience-item">
            <span class="item-logo">
              <img src={oracle} />
            </span>
            <span class="item-name">Oracle</span>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default LandingPage;
