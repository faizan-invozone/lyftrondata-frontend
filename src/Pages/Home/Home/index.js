import React, { Component, Fragment, useState } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  NavLink,
  FormGroup,
  Label,
  Input,
  Button,
  Image,
} from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Configuration from "../../../config/urlconfig";
// import IntByBatchGrapdh from './intByBatchGrapdh';

import Postgres from "../../Integrations/components/image/Postgre-icon.svg";

const HomePage = (props) => {
  return (
    <Fragment>
      <CSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card>
          <CardBody id="generic_superAdmin_table">
            <Container>
              <div>THIS IS HOMEPAGE</div>
            </Container>
          </CardBody>
        </Card>
      </CSSTransitionGroup>
    </Fragment>
  );
};

export default HomePage;
