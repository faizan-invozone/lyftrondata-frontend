import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import logo from "./lyftron.png";

const LandingPage = (props) => {
  return (
    <Fragment>
      <div style={{ backgroundColor: "#a4508b" }}>
        <header
          class="header"
          style={{
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            marginTop: "100px",
            textAlign: "center",
            display: "flex",
            position: "relative",
          }}
        >
          <div class="header-info">
            <img src={logo} alt="Ipenywis" style={{ marginBottom: "15px" }} />
            <h2>LYFTRON</h2>
            <h5>A Data Management Website</h5>
            <Link to="/dashboard/basic">
              <Button color="success" style={{ marginTop: "5px" }}>
                {" "}
                Go To Dashboard
              </Button>
            </Link>
          </div>
        </header>

        {/* <section id="experience" class="section experience-sec">
          <div class="section-header">Languages & Frameworks</div>
          <div class="experience-container">
            <div class="experience-item">
              <span class="item-logo">
                <img src="https://raw.githubusercontent.com/ipenywis/portfolio-landing-page/master/images/laravel-logo.png" />
              </span>
              <span class="item-name">Laravel</span>
            </div>
            <div class="experience-item">
              <span class="item-logo">
                <img src="https://raw.githubusercontent.com/ipenywis/portfolio-landing-page/master/images/react-logo.png" />
              </span>
              <span class="item-name">React</span>
            </div>
            <div class="experience-item">
              <span class="item-logo">
                <img src="https://raw.githubusercontent.com/ipenywis/portfolio-landing-page/master/images/angular-logo.png" />
              </span>
              <span class="item-name">Angular</span>
            </div>
          </div>
        </section> */}
        {/* <div>LANDING PAGE IT IS OK?</div>
      <div>
        <Link to="/dashboard/basic">
          {" "}
          <button>Dashboard</button>
        </Link>
      </div> */}
      </div>
      <section
        style={{
          backgroundColor: "white",
          position: "releative",
          borderRadius: "1px solid",
        }}
      >
        <div>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="username" />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input
                  addon
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Comments" />
          </InputGroup>
          <br />
        </div>
      </section>
    </Fragment>
  );
};
export default LandingPage;
