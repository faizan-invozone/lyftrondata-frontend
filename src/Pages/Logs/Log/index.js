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

export default class AnalyticsDashboard1 extends Component {
  constructor() {
    super();
    this.config = new Configuration();
    this.state = {
      dropdownOpen: false,
      activeTab1: "11",
      data1: [],
      data2: [],
    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  async componentDidMount() {
    const plans = "http://127.0.0.1:8000/plans";
    const plansResponse = await fetch(plans, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const url = this.config.API_URL + "/api/getalltansaction";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const plansData = await plansResponse.json();
    console.log("PLANS: ", plansData);
    const data = await response.json();
    this.setState({ data1: data.results, data2: data.results });
  }

  render() {
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
            <CardBody id="generic_price_table">
              <Container>
                <Row>
                  <Col xs={12} md={8}>
                    <h6 className="bill-heading">
                      Start moving data from 100+ sources to your data warehouse
                      in real-time with no-code.
                    </h6>
                  </Col>
                  <Col xs={12} md={4}>
                    <FormGroup>
                      <Label for="exampleSelect">Select Your Plan</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>Bill Monthly</option>
                        <option>Bill Yearly (Save 20%)</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="generic_content clearfix">
                      <div className="generic_head_price clearfix">
                        <div className="generic_head_content clearfix">
                          <div className="head_bg"></div>
                          <div className="head">
                            <span>Free</span>
                          </div>
                        </div>

                        <div className="generic_price_tag clearfix">
                          <span className="price">
                            <span className="sign">$</span>
                            <span className="currency">0</span>
                          </span>
                        </div>
                      </div>

                      <div className="generic_feature_list">
                        <ListGroup>
                          <ListGroupItem>
                            <span>2GB</span> Bandwidth
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>150GB</span> Storage
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>12</span> Accounts
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>7</span> Host Domain
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>24/7</span> Support
                          </ListGroupItem>
                        </ListGroup>
                      </div>

                      <div className="generic_price_btn clearfix">
                        <NavLink href="#">Sign up</NavLink>
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} md={4}>
                    <div className="generic_content active clearfix">
                      <div className="generic_head_price clearfix">
                        <div className="generic_head_content clearfix">
                          <div className="head_bg"></div>
                          <div className="head">
                            <span>Starter</span>
                          </div>
                          {/* <RangeSlider
                            value={value}
                            onChange={(changeEvent) =>
                              setValue(changeEvent.target.value)
                            }
                          /> */}
                        </div>

                        <div className="generic_price_tag clearfix">
                          <span className="price">
                            <span className="sign">$</span>
                            <span className="currency">199</span>

                            <span className="month">/MON</span>
                          </span>
                        </div>
                      </div>

                      <div className="generic_feature_list">
                        <ListGroup>
                          <ListGroupItem>
                            <span>2GB</span> Bandwidth
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>150GB</span> Storage
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>12</span> Accounts
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>7</span> Host Domain
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>24/7</span> Support
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="generic_price_btn clearfix">
                        <NavLink href="#">Sign up</NavLink>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="generic_content clearfix">
                      <div className="generic_head_price clearfix">
                        <div className="generic_head_content clearfix">
                          <div className="head_bg"></div>
                          <div className="head">
                            <span>Business</span>
                          </div>
                        </div>

                        <div className="generic_price_tag clearfix">
                          <span className="price">
                            <span className="currency">Custom Pricing</span>
                          </span>
                        </div>
                      </div>

                      <div className="generic_feature_list">
                        <ListGroup>
                          <ListGroupItem>
                            <span>2GB</span> Bandwidth
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>150GB</span> Storage
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>12</span> Accounts
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>7</span> Host Domain
                          </ListGroupItem>
                          <ListGroupItem>
                            <span>24/7</span> Support
                          </ListGroupItem>
                        </ListGroup>
                      </div>

                      <div className="generic_price_btn clearfix">
                        <NavLink href="#">Sign up</NavLink>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* check box line */}
                <div className="checkbox">
                  <div className="box-heading">
                    <h3>Select Your Use Case</h3>
                    <p>Let's Personlize Your experince</p>
                  </div>
                  <div className="inner-check-box-content">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{" "}
                        <span>
                          Data Pipeline for setting up a newwear house
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="inner-check-box-content">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{" "}
                        <span>
                          Data Pipeline for setting up a newwear house
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="inner-check-box-content">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{" "}
                        <span>
                          Data Pipeline for setting up a newwear house
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="inner-check-box-content">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{" "}
                        <span>
                          Data Pipeline for setting up a newwear house
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="use-case-submit">
                    <Button variant="primary">Continue</Button>
                  </div>
                </div>

                {/* select your source */}
                <div className="checkbox source-area">
                  <div className="box-heading">
                    <h3>Select Your Source</h3>
                    <p>Let's Personlize Your experince</p>
                  </div>
                  <Row>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="inner-check-box-content">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{" "}
                          </Label>
                        </FormGroup>
                        <div className="icon-name">
                          <img src={Postgres} />
                          <div className="icon-name">
                            <h5>Postgres DB</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </CardBody>
          </Card>

          {/* <div>
                    <div className="app-page-title">
               <div className="page-title-wrapper">
                   <div className="page-title-heading">
                        <div className="page-title-icon">
                       <i className="pe-7s-car icon-gradient bg-mean-fruit"></i></div>
                       <div>Log<div className="page-title-subheading">Data log.
                       </div></div>
                        
                         </div>
                        </div></div>
                        <Row>
                            <Col md="12" lg="12">
                                <Card className="mb-3">
                                    <CardHeader className="card-header-tab">
                                        <div className="card-header-title">
                                            <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                            Data Reports
                                        </div>
                                        <div className="btn-actions-pane-right">
                                            <Button outline
                                                    className={"border-0 btn-pill btn-wide btn-transition " + classnames({active: this.state.activeTab1 === '11'})}
                                                    color="primary" onClick={() => {
                                                this.toggle1('11');
                                            }}>Manual</Button>
                                            <Button outline
                                                    className={"ml-1 btn-pill btn-wide border-0 btn-transition " + classnames({active: this.state.activeTab1 === '22'})}
                                                    color="primary" onClick={() => {
                                                this.toggle1('22');
                                            }}>Scheduled</Button>
                                        </div>
                                    </CardHeader>
                                    <TabContent activeTab={this.state.activeTab1}>
                                        <TabPane tabId="11">
                                            <div className="widget-chart p-0">
                                                <ResponsiveContainer height={179}>
                                                    <ComposedChart data={this.state.data2}>
                                                        <CartesianGrid stroke="#ffffff"/>
                                                        <Area type="monotone" dataKey="amt" fill="#f7ffd0" stroke="#85a200"/>
                                                        <Bar dataKey="pv" barSize={16} fill="var(--primary)"/>
                                                        <Line type="monotone" dataKey="uv" strokeWidth="3" stroke="var(--danger)"/>
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                                <div className="widget-chart-content mt-3 mb-2">
                                                    <div className="widget-description mt-0 text-success">
                                                        <FontAwesomeIcon icon={faArrowUp}/>
                                                        <span className="pl-2 pr-2">37.2%</span>
                                                        <span className="text-muted opacity-8">performance increase</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <CardBody className="pt-2">
                                                <Row>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            23%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Deploys
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="warning"
                                                                        value="23"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            76%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Traffic
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="info"
                                                                        value="76"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="divider mt-4"/>
                                                <Row>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            83%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Servers Load
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="danger"
                                                                        value="83"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            48%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Reported Bugs
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="alternate"
                                                                        value="48"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </CardBody>
                                        </TabPane>
                                    
                                        <TabPane tabId="22">
                                            <CardBody className="pt-2">
                                                <Row className="mt-3">
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            63%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Generated Leads
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="danger"
                                                                        value="63"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            32%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Submitted Tickers
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="success"
                                                                        value="32"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="divider mt-4"/>
                                                <Row>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            71%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Server Allocation
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="primary"
                                                                        value="71"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            41%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Generated Leads
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="warning"
                                                                        value="41"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <div className="widget-chart p-0">
                                                <div className="widget-chart-content">
                                                    <div className="widget-description mt-0 text-warning">
                                                        <FontAwesomeIcon icon={faArrowLeft}/>
                                                        <span className="pl-1">175.5%</span>
                                                        <span className="text-muted opacity-8 pl-1">increased server resources</span>
                                                    </div>
                                                </div>
                                                <ResponsiveContainer height={187}>
                                                    <AreaChart data={this.state.data1} margin={{top: -45, right: 0, left: 0, bottom: 0}}>
                                                        <defs>
                                                            <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="10%" stopColor="var(--warning)" stopOpacity={0.7}/>
                                                                <stop offset="90%" stopColor="var(--warning)" stopOpacity={0}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <Tooltip/>
                                                        <Area type='monotoneX' dataKey='uv' stroke='var(--warning)' strokeWidth={2} fillOpacity={1}
                                                              fill="url(#colorPv2)"/>
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </TabPane>
                                       
                                    </TabContent>
                                </Card>
                              
                            </Col> </Row>
                        <div className="row">
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-danger">71%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style={{ width: '71%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Income Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-success mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-success">54%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style={{ width: '54%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Expenses Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-warning mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-warning">32%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100" style={{ width: '32%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Spendings Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-info mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-info">89%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-info" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100" style={{ width: '89%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Totals Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       </div>
                       <Row>
                       <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Integartion By Batch</CardTitle>
                                    <IntByBatchGrapdh></IntByBatchGrapdh>
                                </CardBody>
                            </Card>

                       </Row> */}
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
