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
