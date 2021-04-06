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

const SuperAdmin = (props) => {
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
              <h6 className="super-admin-heading">Add Lyftron Plan</h6>
              <Row>
                <Col xs={12} md={8}>
                  <FormGroup>
                    <Label for="typeSelect">Type</Label>
                    <Input type="select" name="select" id="typeSelect">
                      <option>Fixed</option>
                      <option>Incremental</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={8}>
                  <FormGroup>
                    <Label for="typeSet">Type</Label>
                    <Input
                      type="text"
                      name="type"
                      id="typeSet"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
              </Row>

              <h6 className="super-admin-sub-heading">Attributes</h6>
              <Row>
                <Col xs={92} md={8}>
                  <FormGroup>
                    <Label for="attributeSet">Attribute</Label>
                    <Input
                      type="textarea"
                      name="attribute"
                      id="attributeSet"
                      placeholder=""
                    />
                  </FormGroup>
                  <Button>Add</Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8}>
                  <FormGroup>
                    <Label for="exampleCustomMutlipleSelect">
                      Plan Attributes
                    </Label>
                    <Input
                      type="select"
                      id="exampleCustomMutlipleSelect"
                      name="customSelect"
                      multiple
                    >
                      <option>5 Paid sources</option>
                      <option>1 Million events</option>
                      <option>24 hour support</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Button>Create Plan</Button>
            </Container>
          </CardBody>
        </Card>
      </CSSTransitionGroup>
    </Fragment>
  );
};

export default SuperAdmin;
