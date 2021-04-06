import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";

import Circle from "react-circle";
import Chart from "react-apexcharts";

import { Row, Col, CardHeader, Progress, Card, CardBody } from "reactstrap";

import Column from "./Examples/Column";
import Bar2 from "./Examples/Bar";
import Area from "./Examples/Area";
import Mixed from "./Examples/Mixed";
import Userchart from "./Examples/Usergraph";

import {
  faAngleUp,
  faAngleDown,
  faQuestionCircle,
  faBusinessTime,
  faCog,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Configuration from "../../../config/urlconfig";
import CountUp from "react-countup";
export default class MinimalDashboard1 extends Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.togglePop1 = this.togglePop1.bind(this);

    this.state = {
      visible: true,
      popoverOpen1: false,

      optionsRadial: {
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Row Insert"],
      },
      seriesRadial: [],

      IntgByStatus: { name: "", total: "0", active: "0", percentage: "0" },
      getIntegByStatusInactive: {
        name: "",
        total: "0",
        inactive: "0",
        percentage: "0",
      },
      IntgBySchedule: { name: "", total: "0", percentage: "0" },
      IntgByWni: { name: "", total: "0" },
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  async componentDidMount() {
    debugger;
    const url = this.config.API_URL + "/api/getIntegByStatus";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const statusdata = await response.json();
    if (response.status != 500) {
      this.setState({ IntgByStatus: statusdata.results[0] });
    }

    const urlinactive = this.config.API_URL + "/api/getIntegByStatusInactive";
    const responseinactive = await fetch(urlinactive, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const inactivestatusdata = await responseinactive.json();
    if (responseinactive.status != 500) {
      this.setState({
        getIntegByStatusInactive: inactivestatusdata.results[0],
      });
    }

    const url2 = this.config.API_URL + "/api/getIntegBySchedule";
    const response2 = await fetch(url2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const statusdata2 = await response2.json();
    if (response2.status != 500) {
      this.setState({ IntgBySchedule: statusdata2.results[0] });
    }

    const url4 = this.config.API_URL + "/api/getIntegByWni";
    const response4 = await fetch(url4, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const statusdata4 = await response4.json();
    if (response4.status != 500) {
      this.setState({ IntgByWni: statusdata4.results[0] });
    }

    const url5 = this.config.API_URL + "/api/getIntegByWniTotal";
    const response5 = await fetch(url5, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const statusdata5 = await response5.json();
    debugger;
    if (response5.status != 500) {
      let seriesRadia = statusdata5.results[0].selectpercentage.split(",");
      this.setState({ seriesRadial: seriesRadia });
    }
  }

  togglePop1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }

  onDismiss() {
    this.setState({ visible: false });
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
          <div className="app-page-title app-page-title-simple">
            <div className="page-title-wrapper">
              <div className="page-title-heading">
                <div className="page-title-icon">
                  <i className="pe-7s-display2 opacity-6"></i>
                </div>
                <div>
                  Dashboard
                  <div className="page-title-subheading">
                    dashboard created using Integration Data.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Row>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-success border-success">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.state.IntgByStatus.name}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-success pr-2">
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                          <CountUp
                            start={0}
                            end={this.state.IntgByStatus.active}
                            separator=""
                            decimals={0}
                            decimal="."
                            prefix=""
                            useEasing={false}
                            suffix=""
                            duration="10"
                          />

                          <small className="opacity-5 pl-1">Active</small>
                        </div>
                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                          <div className="ml-auto">
                            <Circle
                              animate={true} // Boolean: Animated/Static progress
                              animationDuration="10s" // String: Length of animation
                              responsive={false} // Boolean: Make SVG adapt to parent size
                              size="46" // String: Defines the size of the circle.
                              lineWidth="30" // String: Defines the thickness of the circle's stroke.
                              progress={this.state.IntgByStatus.percentage} // String: Update to change the progress and percentage.
                              progressColor="var(--success)" // String: Color of "progress" portion of circle.
                              bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                              textColor="#6b778c" // String: Color of percentage text color.
                              textStyle={{
                                fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                              }}
                              percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                              roundedStroke={true} // Boolean: Rounded/Flat line ends
                              showPercentage={true} // Boolean: Show/hide percentage.
                              showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-danger border-danger">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.state.getIntegByStatusInactive.name}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-danger pr-2">
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                          <CountUp
                            start={0}
                            end={this.state.getIntegByStatusInactive.inactive}
                            separator=""
                            decimals={0}
                            decimal="."
                            prefix=""
                            useEasing={false}
                            suffix=""
                            duration="10"
                          />

                          <small className="opacity-5 pl-1">Inactive</small>
                        </div>
                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                          <div className="ml-auto">
                            <Circle
                              animate={true} // Boolean: Animated/Static progress
                              animationDuration="10s" // String: Length of animation
                              responsive={false} // Boolean: Make SVG adapt to parent size
                              size="46" // String: Defines the size of the circle.
                              lineWidth="30" // String: Defines the thickness of the circle's stroke.
                              progress={
                                this.state.getIntegByStatusInactive.percentage
                              } // String: Update to change the progress and percentage.
                              progressColor="var(--danger)" // String: Color of "progress" portion of circle.
                              bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                              textColor="#6b778c" // String: Color of percentage text color.
                              textStyle={{
                                fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                              }}
                              percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                              roundedStroke={true} // Boolean: Rounded/Flat line ends
                              showPercentage={true} // Boolean: Show/hide percentage.
                              showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-warning border-warning">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.state.IntgBySchedule.name}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-warning pr-2">
                            <FontAwesomeIcon icon={faCalendar} />
                          </span>
                          <CountUp
                            start={0}
                            end={this.state.IntgBySchedule.total}
                            separator=""
                            decimals={0}
                            decimal="."
                            prefix=""
                            useEasing={false}
                            suffix=""
                            duration="10"
                          />

                          <small className="opacity-5 pl-1">Total</small>
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress={this.state.IntgBySchedule.percentage} // String: Update to change the progress and percentage.
                            progressColor="var(--warning)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.state.IntgByWni.name}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="text-primary pr-1">+</small>

                          <CountUp
                            start={0}
                            end={this.state.IntgByWni.total}
                            separator=""
                            decimals={0}
                            decimal="."
                            prefix=""
                            useEasing={false}
                            suffix=""
                            duration="10"
                          />
                          {/* <small className="opacity-5 pl-1">hires</small> */}
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress="100" // String: Update to change the progress and percentage.
                            progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="7" lg="8">
              <Card className="mb-3">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    Integration Report
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <Mixed />
                </CardBody>
              </Card>
            </Col>
            <Col sm="12" md="5" lg="4">
              <Card className="mb-3">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    Total Data
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <Chart
                    options={this.state.optionsRadial}
                    series={this.state.seriesRadial}
                    type="radialBar"
                    height={270}
                  />
                  <div className="widget-content pt-0 w-100">
                    <div className="widget-content-outer">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left pr-2 fsize-1">
                          <div className="widget-numbers mt-0 fsize-3 text-warning">
                            <CountUp
                              start={0}
                              end={100 - this.state.seriesRadial}
                              separator=""
                              decimals={0}
                              decimal="."
                              prefix=""
                              useEasing={false}
                              suffix=""
                              duration="10"
                            />
                            %
                          </div>
                        </div>
                        <div className="widget-content-right w-100">
                          <Progress
                            className="progress-bar-xs"
                            color="warning"
                            value={100 - this.state.seriesRadial}
                          />
                        </div>
                      </div>
                      <div className="widget-content-left fsize-1">
                        <div className="text-muted opacity-6">Rows Select</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <CardHeader className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border">
            <div className="card-header-title fsize-2 text-capitalize font-weight-normal">
              Today
            </div>
          </CardHeader> */}
          <Userchart></Userchart>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
